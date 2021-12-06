import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { FiltersKeys } from '../../../../types/filters';
import { Launch } from '../../../../types/launches';
import { setFilters } from '../../../../redux/modules/filtersDrawer';
import { setLaunches } from '../../../../redux/modules/launches';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state);
  const { unfilteredLaunches, firstLaunchDate, lastLaunchDate } =
    states.launches;
  const { filters } = states.filtersDrawer;

  let localFilters = filters;

  const [dateFromValue, setDateFromValue] = useState<Date | null>(
    filters.dateFrom || new Date(firstLaunchDate),
  );
  const [dateToValue, setDateToValue] = useState<Date | null>(
    filters.dateTo || new Date(lastLaunchDate),
  );

  interface HandleFilterChangeParams {
    filter: string;
    e?: React.ChangeEvent<HTMLInputElement>;
  }

  const handleFilterChange = ({ filter, e }: HandleFilterChangeParams) => {
    if (dateFromValue) {
      localFilters = {
        ...localFilters,
        dateFrom: dateFromValue,
      };
    }

    if (dateToValue) {
      localFilters = {
        ...localFilters,
        dateTo: dateToValue,
      };
    }

    if (e && filter === FiltersKeys.OnlyFavourites) {
      const isChecked = e.target.checked;

      localFilters = {
        ...localFilters,
        onlyFavourites: isChecked,
      };
    }

    dispatch(setFilters(localFilters));

    const filteredLaunches = unfilteredLaunches.filter((launch: Launch) => {
      const filterDate =
        dateFromValue && dateToValue
          ? new Date(launch.launchDateUtc) >= dateFromValue &&
            new Date(launch.launchDateUtc) <= dateToValue
          : true;

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

    dispatch(setLaunches(filteredLaunches));
  };

  return (
    <S.FiltersContainer>
      <S.DatePickerContainer>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            minDate={new Date(firstLaunchDate)}
            maxDate={dateToValue || new Date(lastLaunchDate)}
            value={dateFromValue}
            inputFormat="dd/MM/yyyy"
            onChange={(dateValue: Date | null) => {
              setDateFromValue(dateValue);
              handleFilterChange({ filter: FiltersKeys.DateFrom });
            }}
            renderInput={(params: object) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </S.DatePickerContainer>

      <S.DatePickerContainer>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To"
            minDate={dateFromValue || new Date(firstLaunchDate)}
            maxDate={new Date(lastLaunchDate)}
            value={dateToValue}
            inputFormat="dd/MM/yyyy"
            onChange={(dateValue: Date | null) => {
              setDateToValue(dateValue);
              handleFilterChange({ filter: FiltersKeys.DateTo });
            }}
            renderInput={(params: object) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </S.DatePickerContainer>

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
                handleFilterChange({ filter: FiltersKeys.OnlyFavourites, e })
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
  DatePickerContainer: styled.div`
    margin-bottom: calc(var(--spacing-unit) * 3);
  `,

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
