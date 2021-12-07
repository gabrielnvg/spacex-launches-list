import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Launches } from '../../types/launches';
import { muiBreakpoints } from '../../utils/breakpoints';
import InfiniteScroll from 'react-infinite-scroll-component';
import FadeIn from 'react-fade-in';

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

  useEffect(
    () => setLaunchesToShow(launches.slice(0, LAUNCHES_PER_PAGE)),
    [launches],
  );

  const handleShowMore = () => {
    setTimeout(() => {
      setLaunchesToShow((prevState) => [
        ...prevState,
        ...launches.slice(
          LAUNCHES_PER_PAGE * currentPage,
          LAUNCHES_PER_PAGE * (currentPage + 1),
        ),
      ]);

      setCurrentPage((prevState) => prevState + 1);
    }, 100);
  };

  return (
    <S.LaunchesListContainer>
      <InfiniteScroll
        style={{ overflow: 'initial' }}
        dataLength={launchesToShow.length}
        next={handleShowMore}
        hasMore={currentPage < totalPages}
        loader=""
        endMessage={
          <FadeIn>
            <S.EndOfList>
              <p>No more launches :)</p>
            </S.EndOfList>
          </FadeIn>
        }
      >
        <S.LaunchesList>
          {launchesToShow.map((launch) => (
            <FadeIn key={launch.missionName}>
              <LaunchCard launch={launch} />
            </FadeIn>
          ))}
        </S.LaunchesList>

        {isInLastPage({ currentPage, totalPages }) ? null : (
          <FadeIn>
            <S.EndOfList>
              <p>Scroll down to see more!</p>
            </S.EndOfList>
          </FadeIn>
        )}
      </InfiniteScroll>
    </S.LaunchesListContainer>
  );
};

const S = {
  LaunchesListContainer: styled.div`
    margin-top: calc(var(--spacing-unit) * 3);
    margin-bottom: calc(var(--spacing-unit) * 8);
    min-height: calc(100vh + 10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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

  EndOfList: styled.div`
    margin-top: calc(var(--spacing-unit) * 3);
    text-align: center;
  `,
};

export default LaunchesList;
