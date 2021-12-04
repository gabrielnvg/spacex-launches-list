import { Launch, Launches } from '../types/launches';

interface Params {
  launchesArray: Launches;
  isFavourite: boolean;
  missionName: string;
}

const changeIsFavouriteValues = ({
  launchesArray,
  isFavourite,
  missionName,
}: Params) =>
  launchesArray.map((launch: Launch) => {
    if (launch.missionName === missionName) {
      return {
        ...launch,
        isFavourite,
      };
    }

    return launch;
  });

export default changeIsFavouriteValues;
