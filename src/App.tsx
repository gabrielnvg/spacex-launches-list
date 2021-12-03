import './App.css';
import { useEffect } from 'react';
import { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import FadeIn from 'react-fade-in';
import { fetchLaunches } from './redux/modules/launches';

import MainContainer from './components/MainContainer/MainContainer';
import FetchError from './components/FetchError/FetchError';
import FetchLoading from './components/FetchLoading/FetchLoading';
import LaunchesList from './components/LaunchesList/LaunchesList';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const launchesState = useSelector((state: RootState) => state.launches);
  const { fetchStatus, launches } = launchesState;

  useEffect(() => {
    dispatch(fetchLaunches());
  }, []);

  return (
    <MainContainer>
      {fetchStatus.hasError && (
        <FadeIn>
          <FetchError />
        </FadeIn>
      )}

      {fetchStatus.isLoading && !fetchStatus.hasError && (
        <FadeIn>
          <FetchLoading />
        </FadeIn>
      )}

      {!fetchStatus.isLoading && !fetchStatus.hasError && (
        <LaunchesList launches={launches} />
      )}
    </MainContainer>
  );
};

export default App;
