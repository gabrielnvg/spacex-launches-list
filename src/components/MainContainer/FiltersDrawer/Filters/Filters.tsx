import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { FiltersKeys, Success, PastUpcoming } from '../../../../types/filters';
import { Launch } from '../../../../types/launches';
import {
  setFilters,
  handleResetFilters,
} from '../../../../redux/modules/filtersDrawer';
import { setLaunches } from '../../../../redux/modules/launches';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@mui/material/Button';

const isSuccess = (text: Success.Succeeded | Success.Unsucceeded) =>
  text === Success.Succeeded;

const isUpcoming = (text: PastUpcoming.Upcoming | PastUpcoming.Past) =>
  text === PastUpcoming.Upcoming;

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
  const [successValue, setSuccessValue] = useState<string>(
    filters.success || Success.All,
  );
  const [pastUpcomingValue, setPastUpcomingValue] = useState<string>(
    filters.pastUpcoming || PastUpcoming.All,
  );

  interface HandleFilterChangeParams {
    filter: string;
    targetValue?: boolean | string;
  }

  const handleFilterChange = ({
    filter,
    targetValue,
  }: HandleFilterChangeParams) => {
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

    if (filter === FiltersKeys.Success) {
      localFilters = {
        ...localFilters,
        success: targetValue,
      };
    }

    if (filter === FiltersKeys.PastUpcoming) {
      localFilters = {
        ...localFilters,
        pastUpcoming: targetValue,
      };
    }

    if (filter === FiltersKeys.OnlyFavourites) {
      localFilters = {
        ...localFilters,
        onlyFavourites: targetValue,
      };
    }

    dispatch(setFilters(localFilters));

    const filteredLaunches = unfilteredLaunches.filter((launch: Launch) => {
      const filterDate =
        dateFromValue && dateToValue
          ? new Date(launch.launchDateUtc) >= dateFromValue &&
            new Date(launch.launchDateUtc) <= dateToValue
          : true;

      const filterSuccess =
        localFilters.success === Success.All
          ? true
          : launch.launchSuccess === isSuccess(localFilters.success);

      const filterPastUpcoming =
        localFilters.pastUpcoming === PastUpcoming.All
          ? true
          : launch.upcoming === isUpcoming(localFilters.pastUpcoming);

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

  const handleResetButtonClick = () => {
    localFilters = {
      dateFrom: new Date(firstLaunchDate),
      dateTo: new Date(lastLaunchDate),
      success: Success.All,
      pastUpcoming: PastUpcoming.All,
      onlyFavourites: false,
    };

    setDateFromValue(localFilters.dateFrom);
    setDateToValue(localFilters.dateTo);
    setSuccessValue(localFilters.success);
    setPastUpcomingValue(localFilters.pastUpcoming);

    handleFilterChange({ filter: FiltersKeys.Reset });

    dispatch(handleResetFilters());
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

      <S.SelectContainer>
        <FormControl sx={{ minWidth: 195 }}>
          <InputLabel id="success-select-label">Success</InputLabel>
          <Select
            labelId="success-select-label"
            id="success-select"
            value={successValue}
            label="Success"
            onChange={(e: SelectChangeEvent<string>) => {
              setSuccessValue(e.target.value);
              handleFilterChange({
                filter: FiltersKeys.Success,
                targetValue: e.target.value,
              });
            }}
          >
            <MenuItem value={Success.All}>{Success.All}</MenuItem>
            <MenuItem value={Success.Succeeded}>{Success.Succeeded}</MenuItem>
            <MenuItem value={Success.Unsucceeded}>
              {Success.Unsucceeded}
            </MenuItem>
          </Select>
        </FormControl>
      </S.SelectContainer>

      <Divider />

      <S.SelectContainer>
        <FormControl sx={{ minWidth: 195 }}>
          <InputLabel id="past-upcoming-select-label">Past/Upcoming</InputLabel>
          <Select
            labelId="past-upcoming-select-label"
            id="past-upcoming-select"
            value={pastUpcomingValue}
            label="Past/Upcoming"
            onChange={(e: SelectChangeEvent<string>) => {
              setPastUpcomingValue(e.target.value);
              handleFilterChange({
                filter: FiltersKeys.PastUpcoming,
                targetValue: e.target.value,
              });
            }}
          >
            <MenuItem value={PastUpcoming.All}>{PastUpcoming.All}</MenuItem>
            <MenuItem value={PastUpcoming.Past}>{PastUpcoming.Past}</MenuItem>
            <MenuItem value={PastUpcoming.Upcoming}>
              {PastUpcoming.Upcoming}
            </MenuItem>
          </Select>
        </FormControl>
      </S.SelectContainer>

      <Divider />

      <S.CheckboxContainer>
        <FormGroup>
          <FormControlLabel
            control={
              <S.StyledCheckbox
                checked={filters.onlyFavourites}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange({
                    filter: FiltersKeys.OnlyFavourites,
                    targetValue: e.target.checked,
                  })
                }
              />
            }
            label="Show only favourites"
          />
        </FormGroup>
      </S.CheckboxContainer>

      <Divider />

      <S.ButtonContainer>
        <Button variant="contained" onClick={handleResetButtonClick}>
          Reset filters
        </Button>
      </S.ButtonContainer>
    </S.FiltersContainer>
  );
};

const S = {
  DatePickerContainer: styled.div`
    margin-bottom: calc(var(--spacing-unit) * 3);
  `,

  SelectContainer: styled.div`
    margin: calc(var(--spacing-unit) * 3) 0;
  `,

  FiltersContainer: styled.div`
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
  `,

  CheckboxContainer: styled.div`
    margin: calc(var(--spacing-unit) * 2) 0;
  `,

  StyledCheckbox: styled(Checkbox)`
    &.css-ncoufy-MuiButtonBase-root-MuiCheckbox-root.Mui-checked {
      color: var(--color-primary);
    }
  `,

  ButtonContainer: styled.div`
    & > button {
      margin: calc(var(--spacing-unit) * 4) 0;
      background-color: var(--color-primary);

      &:hover {
        background-color: var(--color-primary);
      }
    }
  `,
};

export default Filters;
