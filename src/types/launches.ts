export type FetchedLaunch = {
  flight_number: number;
  mission_name: string;
  launch_year: number;
  launch_success: boolean;
  rocket: {
    rocket_name: string;
    [key: string]: any;
  };
  links: {
    mission_patch_small: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export type FetchedLaunches = Array<FetchedLaunch>;

export type Launch = {
  flightNumber: number;
  missionName: string;
  launchYear: number;
  launchSuccess: boolean;
  rocketName: string;
  imageUrl: string;
};

export type Launches = Array<Launch>;
