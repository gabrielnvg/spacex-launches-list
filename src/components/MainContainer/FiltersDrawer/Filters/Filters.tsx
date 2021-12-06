import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { FiltersKeys } from '../../../../types/filters';
import { Launch } from '../../../../types/launches';
import { setFilters } from '../../../../redux/modules/filtersDrawer';
import { setLaunches } from '../../../../redux/modules/launches';

import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state);
  const { unfilteredLaunches } = states.launches;
  const { filters } = states.filtersDrawer;

  let localFilters = filters;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: string,
  ) => {
    console.log('current filter: ', filter);

    if (filter === FiltersKeys.OnlyFavourites) {
      const isChecked = e.target.checked;

      localFilters = {
        ...filters,
        onlyFavourites: isChecked,
      };
    }

    dispatch(setFilters(localFilters));

    const filteredLaunches = unfilteredLaunches.filter((launch: Launch) => {
      const filterDate = true;

      const filterSuccess = true;

      const filterPastUpcoming = true;

      const filterOnlyFavourites = localFilters.onlyFavourites
        ? launch.isFavourite === true
        : true;

      return (
        filterDate &&
        filterSuccess &&
        filterPastUpcoming &&
        filterOnlyFavourites
      );
    });

    console.log('filteredLaunches: ', filteredLaunches);

    dispatch(setLaunches(filteredLaunches));

    console.log('localFilters: ', localFilters);
    console.log('filters: ', filters);
  };

  return (
    <S.FiltersContainer>
      <div>Date filter here.</div>

      <Divider />

      <div>succeeded/unsucceeded filter here.</div>

      <Divider />

      <div>past/upcoming filter here. </div>

      <Divider />

      <FormGroup>
        <FormControlLabel
          control={
            <S.StyledCheckbox
              checked={filters.onlyFavourites}
              onChange={(e) =>
                handleFilterChange(e, FiltersKeys.OnlyFavourites)
              }
            />
          }
          label="Show only favourites"
        />
      </FormGroup>
    </S.FiltersContainer>
  );
};

const S = {
  FiltersContainer: styled.div`
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
  `,

  StyledCheckbox: styled(Checkbox)`
    &.css-ncoufy-MuiButtonBase-root-MuiCheckbox-root.Mui-checked {
      color: var(--color-primary);
    }
  `,
};

export default Filters;
