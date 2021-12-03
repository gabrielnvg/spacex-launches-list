import styled from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import NavBar from './NavBar/NavBar';
import ScrollTop from './ScrollTop/ScrollTop';
import FiltersDrawer from './FiltersDrawer/FiltersDrawer';

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => (
  <>
    <CssBaseline />
    <NavBar />
    <Toolbar id="back-to-top-anchor" />

    <Container>
      <S.StyledBox my={2}>{children}</S.StyledBox>
    </Container>

    <ScrollTop>
      <S.StyledFab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </S.StyledFab>
    </ScrollTop>

    <FiltersDrawer />
  </>
);

const S = {
  StyledBox: styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  StyledFab: styled(Fab)`
    background-color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary);
    }

    & > svg {
      color: #ffffff;
    }
  `,
};

export default MainContainer;
