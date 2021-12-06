import styled from 'styled-components';
import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Launch } from '../../../types/launches';
import { Success, PastUpcoming } from '../../../types/filters';
import {
  storeFavouriteOnStorage,
  removeFavouriteFromStorage,
} from '../../../redux/modules/launches';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import placeholderImage from './images/placeholder.png';

interface LaunchCardProps {
  launch: Launch;
}

const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  const dispatch = useDispatch();

  const handleFavouriteClick = (isFavourite: boolean, missionName: string) =>
    isFavourite
      ? dispatch(removeFavouriteFromStorage(missionName))
      : dispatch(storeFavouriteOnStorage(missionName));

  return (
    <S.StyledCard>
      <S.StyledCardMedia>
        <div>
          <img
            src={launch.imageUrl || ''}
            alt={launch.missionName || ''}
            title={launch.missionName || ''}
            onError={(e: SyntheticEvent<HTMLImageElement>) => {
              const target: any = e.target;
              target.onError = null;
              target.src = placeholderImage;
            }}
          />
        </div>

        <S.FavouriteButtonContainer>
          <IconButton
            aria-label="favourite the launch"
            color="inherit"
            onClick={() =>
              handleFavouriteClick(launch.isFavourite, launch.missionName)
            }
          >
            {launch.isFavourite ? <Star /> : <StarBorder />}
          </IconButton>
        </S.FavouriteButtonContainer>

        <S.FlightNumber>
          <Typography>
            Nº <b>{launch.flightNumber}</b>
          </Typography>
        </S.FlightNumber>

        <S.LaunchYear>
          <Typography>
            <b>{launch.launchYear}</b>
          </Typography>
        </S.LaunchYear>
      </S.StyledCardMedia>

      <CardContent>
        <S.MissionName>
          <Typography component="h2">
            Mission: <b>{launch.missionName}</b>
          </Typography>
        </S.MissionName>

        <Divider />

        <S.RocketName>
          <Typography>
            Rocket: <b>{launch.rocketName}</b>
          </Typography>
        </S.RocketName>

        <S.LaunchSuccess>
          <Typography>
            {typeof launch.launchSuccess === 'boolean' &&
              (launch.launchSuccess ? (
                <S.SucceededText>{Success.Succeeded}</S.SucceededText>
              ) : (
                <S.UnsucceededText>{Success.Unsucceeded}</S.UnsucceededText>
              ))}

            {launch.upcoming && (
              <S.UpcomingText>{PastUpcoming.Upcoming}</S.UpcomingText>
            )}
          </Typography>
        </S.LaunchSuccess>
      </CardContent>
    </S.StyledCard>
  );
};

const LabelText = styled.span`
  padding: calc(var(--spacing-unit) / 3) var(--spacing-unit);
  color: #ffffff;
  background-color: var(--color-primary);
  border-radius: 25px;
`;

const S = {
  StyledCard: styled(Card)`
    width: 280px;
  `,

  StyledCardMedia: styled(CardMedia)`
    position: relative;

    & > div:first-of-type {
      padding: calc(var(--spacing-unit) * 2);
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary);

      & > img {
        height: 100%;
      }
    }
  `,

  FavouriteButtonContainer: styled.div`
    position: absolute;
    top: 0;
    right: calc(var(--spacing-unit) / 4);
    color: #ffffff;
  `,

  FlightNumber: styled.div`
    position: absolute;
    bottom: var(--spacing-unit);
    left: calc(var(--spacing-unit) * 1.5);
    color: #ffffff;
  `,

  LaunchYear: styled.div`
    position: absolute;
    bottom: var(--spacing-unit);
    right: calc(var(--spacing-unit) * 1.5);
    color: #ffffff;
  `,

  MissionName: styled.div`
    margin-bottom: var(--spacing-unit);
    height: calc(var(--spacing-unit) * 6);
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,

  RocketName: styled.div`
    margin-top: var(--spacing-unit);
    margin-bottom: var(--spacing-unit);
    height: calc(var(--spacing-unit) * 6);
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,

  LaunchSuccess: styled.div`
    margin-top: var(--spacing-unit);
    margin-bottom: calc(var(--spacing-unit) * -1);
    height: calc(var(--spacing-unit) * 3);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,

  SucceededText: styled(LabelText)`
    background-color: #00c853;
  `,

  UnsucceededText: styled(LabelText)`
    background-color: #f44336;
  `,

  UpcomingText: styled(LabelText)`
    background-color: #1976d2;
  `,
};

export default LaunchCard;
