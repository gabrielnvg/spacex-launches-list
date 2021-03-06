import { Success, PastUpcoming, Filters } from '../../types/filters';

const types = {
  SET_IS_DRAWER_OPEN: 'filtersDrawer/SET_IS_DRAWER_OPEN',
  SET_FILTERS: 'filtersDrawer/SET_FILTERS',
  RESET_FILTERS: 'filtersDrawer/RESET_FILTERS',
};

const initialState = {
  isDrawerOpen: false,
  filters: {
    dateFrom: null,
    dateTo: null,
    success: Success.All,
    pastUpcoming: PastUpcoming.All,
    onlyFavourites: false,
  },
};

const reducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case types.SET_IS_DRAWER_OPEN:
      return {
        ...state,
        isDrawerOpen: action.isDrawerOpen,
      };
    case types.SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case types.RESET_FILTERS:
      return {
        ...state,
        filters: action.resetedFilters,
      };
    default:
      return state;
  }
};

export const setIsDrawerOpen = (isDrawerOpen: boolean) => ({
  type: types.SET_IS_DRAWER_OPEN,
  isDrawerOpen,
});

export const setFilters = (filters: Filters) => ({
  type: types.SET_FILTERS,
  filters,
});

export const resetFilters = (resetedFilters: Filters) => ({
  type: types.RESET_FILTERS,
  resetedFilters,
});

export const toggleFiltersDrawer = (isOpen: boolean) => (dispatch: Function) =>
  dispatch(setIsDrawerOpen(isOpen));

export const handleResetFilters =
  () => (dispatch: Function, getState: Function) => {
    const { firstLaunchDate, lastLaunchDate } = getState().launches;

    const resetedFilters = {
      dateFrom: new Date(firstLaunchDate),
      dateTo: new Date(lastLaunchDate),
      success: Success.All,
      pastUpcoming: PastUpcoming.All,
      onlyFavourites: false,
    };

    dispatch(resetFilters(resetedFilters));
  };

export default reducer;
