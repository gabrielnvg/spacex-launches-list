import styled from 'styled-components';
import { Launches } from '../../types/launches';
import { muiBreakpoints } from '../../utils/breakpoints';
import FadeIn from 'react-fade-in';

import LaunchCard from './LaunchCard/LaunchCard';

interface LaunchesListProps {
  launches: Launches;
}

const LaunchesList: React.FC<LaunchesListProps> = ({ launches }) => (
  <S.LaunchesList>
    {launches.map((launch) => (
      <FadeIn key={launch.missionName}>
        <LaunchCard launch={launch} />
      </FadeIn>
    ))}
  </S.LaunchesList>
);

const S = {
  LaunchesList: styled.div`
    margin-top: 20px;
    margin-bottom: 60px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    @media screen and (min-width: ${`${muiBreakpoints.sm}px`}) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: ${`${muiBreakpoints.md}px`}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: ${`${muiBreakpoints.lg}px`}) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  `,
};

export default LaunchesList;
