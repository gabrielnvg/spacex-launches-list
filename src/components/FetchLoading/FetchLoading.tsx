import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const FetchLoading: React.FC = () => (
  <S.FetchLoading>
    <p>Loading the launches list, please wait...</p>

    <S.StyledCircularProgress />
  </S.FetchLoading>
);

const S = {
  FetchLoading: styled.div`
    margin-top: calc(var(--spacing-unit) * 3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  StyledCircularProgress: styled(CircularProgress)`
    margin-top: 20px;

    & > svg {
      color: var(--color-primary);
    }
  `,
};

export default FetchLoading;
