import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Launches } from '../../types/launches';
import { muiBreakpoints } from '../../utils/breakpoints';
import FadeIn from 'react-fade-in';

import Button from '@mui/material/Button';

import LaunchCard from './LaunchCard/LaunchCard';

const LAUNCHES_PER_PAGE = 4;

interface isInLastPageParams {
  currentPage: number;
  totalPages: number;
}

const isInLastPage = ({ currentPage, totalPages }: isInLastPageParams) =>
  currentPage >= totalPages;

interface LaunchesListProps {
  launches: Launches;
}

const LaunchesList: React.FC<LaunchesListProps> = ({ launches }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [launchesToShow, setLaunchesToShow] = useState(
    launches.slice(0, LAUNCHES_PER_PAGE),
  );

  const launchesLength = launches.length;
  const totalPages = Math.ceil(launchesLength / LAUNCHES_PER_PAGE);

  useEffect(() => {
    setLaunchesToShow(launches.slice(0, LAUNCHES_PER_PAGE));
  }, [launches]);

  const handleShowMore = () => {
    setLaunchesToShow((prevState) => [
      ...prevState,
      ...launches.slice(
        LAUNCHES_PER_PAGE * currentPage,
        LAUNCHES_PER_PAGE * (currentPage + 1),
      ),
    ]);

    setCurrentPage((prevState) => prevState + 1);
  };

  return (
    <S.LaunchesListContainer>
      <S.LaunchesList>
        {launchesToShow.map((launch) => (
          <FadeIn key={launch.missionName}>
            <LaunchCard launch={launch} />
          </FadeIn>
        ))}
      </S.LaunchesList>

      {isInLastPage({ currentPage, totalPages }) ? (
        <FadeIn>
          <S.EndOfList>
            <p>No more launches :)</p>
          </S.EndOfList>
        </FadeIn>
      ) : (
        <FadeIn>
          <S.ButtonContainer>
            <Button variant="contained" onClick={handleShowMore}>
              Show more
            </Button>
          </S.ButtonContainer>
        </FadeIn>
      )}
    </S.LaunchesListContainer>
  );
};

const S = {
  LaunchesListContainer: styled.div`
    margin-top: calc(var(--spacing-unit) * 3);
    margin-bottom: calc(var(--spacing-unit) * 8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  LaunchesList: styled.div`
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

  ButtonContainer: styled.div`
    & > button {
      margin-top: calc(var(--spacing-unit) * 4);
      background-color: var(--color-primary);

      &:hover {
        background-color: var(--color-primary);
      }
    }
  `,

  EndOfList: styled.div`
    margin-top: calc(var(--spacing-unit) * 3);
  `,
};

export default LaunchesList;
