import { FetchedLaunch, Launches } from '../../types/launches';
import fetchWithTimeout from '../../utils/fetchWithTimeout';

const LAUNCHES_ENDPOINT = 'https://api.spacexdata.com/v3/launches';

const types = {
  SET_FETCH_LOADING: 'launches/SET_FETCH_LOADING',
  SET_FETCH_ERROR: 'launches/SET_FETCH_ERROR',
  SET_PRISTINE_LAUNCHES: 'launches/SET_PRISTINE_LAUNCHES',
  SET_LAUNCHES: 'launches/SET_LAUNCHES',
};

const initialState = {
  fetchStatus: {
    isLoading: true,
    hasError: false,
  },
  pristineLaunches: [],
  launches: [],
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
    case types.SET_PRISTINE_LAUNCHES:
      return {
        ...state,
        pristineLaunches: action.pristineLaunches,
      };
    case types.SET_LAUNCHES:
      return {
        ...state,
        launches: action.launches,
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

export const setPristineLaunches = (pristineLaunches: Launches) => ({
  type: types.SET_PRISTINE_LAUNCHES,
  pristineLaunches,
});

export const setLaunches = (launches: Launches) => ({
  type: types.SET_LAUNCHES,
  launches,
});

export const fetchLaunches = () => (dispatch: Function) => {
  fetchWithTimeout({
    url: LAUNCHES_ENDPOINT,
    timeout: 10000,
  })
    .then((response) => response.json())
    .then((fetchedData) => {
      const launches = fetchedData.map((launch: FetchedLaunch) => ({
        flightNumber: launch.flight_number,
        missionName: launch.mission_name,
        launchYear: launch.launch_year,
        launchSuccess: launch.launch_success,
        rocketName: launch.rocket.rocket_name,
        imageUrl: launch.links.mission_patch_small,
      }));

      dispatch(setPristineLaunches(launches));
      dispatch(setLaunches(launches));
      dispatch(setFetchLoading(false));
    })
    .catch(() => {
      dispatch(setFetchError(true));
    });
};

export default reducer;