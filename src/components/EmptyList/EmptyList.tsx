import styled from 'styled-components';

const EmptyList: React.FC = () => (
  <S.EmptyList>
    <p>No launches were found :(</p>
  </S.EmptyList>
);

const S = {
  EmptyList: styled.div`
    margin-top: 25px;
  `,
};

export default EmptyList;
