export enum FiltersKeys {
  DateFrom = "dateFrom",
  DateTo = "dateTo",
  Success = 'success',
  PastUpcoming = 'pastUpcoming',
  OnlyFavourites = 'onlyFavourites',
}

export enum Success {
  All = 'All',
  Succeeded = 'Succeeded',
  Unsucceeded = 'Unsucceeded',
}

export enum PastUpcoming {
  All = 'All',
  Past = 'Past',
  Upcoming = 'Upcoming',
}

export interface Filters {
  dateFrom: Date | null,
  dateTo: Date | null,
  success: Success;
  pastUpcoming: PastUpcoming;
  onlyFavourites: boolean;
}
