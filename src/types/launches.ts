export type FetchedLaunch = {
  flight_number: number | null;
  mission_name: string | null;
  launch_year: number | null;
  launch_success: boolean | null;
  rocket: {
    rocket_name: string | null;
    [key: string]: any;
  };
  links: {
    mission_patch_small: string | null;
    [key: string]: any;
  };
  [key: string]: any;
};

export type FetchedLaunches = Array<FetchedLaunch>;

export type Launch = {
  flightNumber: number | null;
  missionName: string | null;
  launchYear: number | null;
  launchSuccess: boolean | null;
  rocketName: string | null;
  imageUrl: string | null;
};

export type Launches = Array<Launch>;
