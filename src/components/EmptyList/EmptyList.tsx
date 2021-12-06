import styled from 'styled-components';

const EmptyList: React.FC = () => (
  <S.EmptyList>
    <p>No launches were found :(</p>
  </S.EmptyList>
);

const S = {
  EmptyList: styled.div`
    margin-top: calc(var(--spacing-unit) * 3);
  `,
};

export default EmptyList;
