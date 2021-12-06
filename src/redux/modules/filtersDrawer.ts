import { Success, PastUpcoming, Filters } from '../../types/filters';

const types = {
  SET_IS_DRAWER_OPEN: 'filtersDrawer/SET_IS_DRAWER_OPEN',
  SET_FILTERS: 'filtersDrawer/SET_FILTERS',
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

export const toggleFiltersDrawer = (isOpen: boolean) => (dispatch: Function) =>
  dispatch(setIsDrawerOpen(isOpen));

export default reducer;
