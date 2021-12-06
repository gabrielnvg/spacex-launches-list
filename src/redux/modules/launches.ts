import storage, { storageKeys } from '../../services/storage';
import { FetchedLaunch, Launch, Launches } from '../../types/launches';
import changeIsFavouriteValues from '../../utils/changeIsFavouriteValues';
import fetchWithTimeout from '../../utils/fetchWithTimeout';

const LAUNCHES_ENDPOINT = 'https://api.spacexdata.com/v3/launches';

const types = {
  SET_FETCH_LOADING: 'launches/SET_FETCH_LOADING',
  SET_FETCH_ERROR: 'launches/SET_FETCH_ERROR',
  SET_UNFILTERED_LAUNCHES: 'launches/SET_UNFILTERED_LAUNCHES',
  SET_LAUNCHES: 'launches/SET_LAUNCHES',
  SET_FIRST_LAUNCH_DATE: 'launches/SET_FIRST_LAUNCH_DATE',
  SET_LAST_LAUNCH_DATE: 'launches/SET_LAST_LAUNCH_DATE',
};

const initialState = {
  fetchStatus: {
    isLoading: true,
    hasError: false,
  },
  unfilteredLaunches: [],
  launches: [],
  firstLaunchDate: '',
  lastLaunchDate: '',
};

const reducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case types.SET_FETCH_LOADING:
      return {
        ...state,
        fetchStatus: {
          isLoading: action.isLoading,
          hasError: false,
        },
      };
    case types.SET_FETCH_ERROR:
      return {
        ...state,
        fetchStatus: {
          isLoading: false,
          hasError: action.hasError,
        },
      };
    case types.SET_UNFILTERED_LAUNCHES:
      return {
        ...state,
        unfilteredLaunches: action.unfilteredLaunches,
      };
    case types.SET_LAUNCHES:
      return {
        ...state,
        launches: action.launches,
      };
    case types.SET_FIRST_LAUNCH_DATE:
      return {
        ...state,
        firstLaunchDate: action.firstLaunchDate,
      };
    case types.SET_LAST_LAUNCH_DATE:
      return {
        ...state,
        lastLaunchDate: action.lastLaunchDate,
      };
    default:
      return state;
  }
};

export const setFetchLoading = (isLoading: boolean) => ({
  type: types.SET_FETCH_LOADING,
  isLoading,
});

export const setFetchError = (hasError: boolean) => ({
  type: types.SET_FETCH_ERROR,
  hasError,
});

export const setUnfilteredLaunches = (unfilteredLaunches: Launches) => ({
  type: types.SET_UNFILTERED_LAUNCHES,
  unfilteredLaunches,
});

export const setLaunches = (launches: Launches) => ({
  type: types.SET_LAUNCHES,
  launches,
});

export const setFirstLaunchDate = (firstLaunchDate: Date) => ({
  type: types.SET_FIRST_LAUNCH_DATE,
  firstLaunchDate,
});

export const setLastLaunchDate = (lastLaunchDate: Date) => ({
  type: types.SET_LAST_LAUNCH_DATE,
  lastLaunchDate,
});

export const getFavouritesFromStorage = () =>
  storage.get(storageKeys.favouriteLaunches);

export const storeFavouriteOnStorage =
  (missionName: string) => (dispatch: Function, getState: Function) => {
    const storageFavourites = getFavouritesFromStorage() || [];
    const { unfilteredLaunches, launches } = getState().launches;

    storage.set(storageKeys.favouriteLaunches, [
      ...storageFavourites,
      missionName,
    ]);

    const alteredLaunches = changeIsFavouriteValues({
      launchesArray: launches,
      isFavourite: true,
      missionName,
    });

    dispatch(setLaunches(alteredLaunches));

    const alteredUnfilteredLaunches = changeIsFavouriteValues({
      launchesArray: unfilteredLaunches,
      isFavourite: true,
      missionName,
    });

    dispatch(setUnfilteredLaunches(alteredUnfilteredLaunches));
  };

export const removeFavouriteFromStorage =
  (missionName: string) => (dispatch: Function, getState: Function) => {
    const storageFavourites = getFavouritesFromStorage() || [];
    const { unfilteredLaunches, launches } = getState().launches;

    const alteredFavourites = storageFavourites.filter(
      (favourite: string) => !Boolean(favourite === missionName),
    );

    storage.set(storageKeys.favouriteLaunches, alteredFavourites);

    const alteredLaunches = changeIsFavouriteValues({
      launchesArray: launches,
      isFavourite: false,
      missionName,
    });

    dispatch(setLaunches(alteredLaunches));

    const alteredUnfilteredLaunches = changeIsFavouriteValues({
      launchesArray: unfilteredLaunches,
      isFavourite: false,
      missionName,
    });

    dispatch(setUnfilteredLaunches(alteredUnfilteredLaunches));
  };

export const fetchLaunches = () => (dispatch: Function) => {
  fetchWithTimeout({
    url: LAUNCHES_ENDPOINT,
    timeout: 10000,
  })
    .then((response) => response.json())
    .then((fetchedData) => {
      const storageFavouriteLaunches = getFavouritesFromStorage();

      let firstLaunchDate = fetchedData[0].launch_date_utc;
      let lastLaunchDate = fetchedData[0].launch_date_utc;

      const launches = fetchedData.map((launch: FetchedLaunch) => {
        firstLaunchDate =
          launch.launch_date_utc < firstLaunchDate
            ? launch.launch_date_utc
            : firstLaunchDate;

        lastLaunchDate =
          launch.launch_date_utc > lastLaunchDate
            ? launch.launch_date_utc
            : lastLaunchDate;

        return {
          flightNumber: launch.flight_number,
          missionName: launch.mission_name,
          launchYear: launch.launch_year,
          launchDateUtc: launch.launch_date_utc,
          launchSuccess: launch.launch_success,
          upcoming: launch.upcoming,
          rocketName: launch.rocket.rocket_name,
          imageUrl: launch.links.mission_patch_small,
          isFavourite:
            storageFavouriteLaunches &&
            storageFavouriteLaunches.includes(launch.mission_name),
        };
      });

      dispatch(setUnfilteredLaunches(launches));
      dispatch(setLaunches(launches));
      dispatch(setFirstLaunchDate(firstLaunchDate));
      dispatch(setLastLaunchDate(lastLaunchDate));
      dispatch(setFetchLoading(false));
    })
    .catch(() => {
      dispatch(setFetchError(true));
    });
};

export default reducer;
