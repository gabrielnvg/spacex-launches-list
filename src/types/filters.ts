export enum FiltersKeys {
  Date = 'date',
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
  date: {
    from: string;
    to: string;
  };
  success: Success;
  pastUpcoming: PastUpcoming;
  onlyFavourites: boolean;
}
