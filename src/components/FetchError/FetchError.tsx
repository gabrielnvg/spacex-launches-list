import styled from 'styled-components';

const FetchError: React.FC = () => (
  <S.FetchError>
    <S.TextRow>
      <p>Could not get the launches list.</p>
    </S.TextRow>

    <S.TextRow>
      <p>Please check your connection and try again later.</p>
    </S.TextRow>
  </S.FetchError>
);

const S = {
  FetchError: styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  TextRow: styled.div`
    &:not(:first-of-type) {
      margin-top: 10px;
    }
  `,
};

export default FetchError;
