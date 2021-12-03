const types = {
  SET_IS_DRAWER_OPEN: 'filtersDrawer/SET_IS_DRAWER_OPEN',
};

const initialState = {
  isDrawerOpen: false,
};

const reducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case types.SET_IS_DRAWER_OPEN:
      return {
        ...state,
        isDrawerOpen: action.isDrawerOpen,
      };
    default:
      return state;
  }
};

export const setIsDrawerOpen = (isDrawerOpen: boolean) => ({
  type: types.SET_IS_DRAWER_OPEN,
  isDrawerOpen,
});

export const toggleFiltersDrawer = (isOpen: boolean) => (dispatch: Function) =>
  dispatch(setIsDrawerOpen(isOpen));

export default reducer;
