import styled from 'styled-components';
import { muiBreakpoints } from '../../../utils/breakpoints';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterList from '@material-ui/icons/FilterList';

const NavBar: React.FC = () => (
  <S.Grow>
    <S.StyledAppBar>
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <img
            src="/logo32-negative.png"
            alt="SpaceX Launches List"
            title="SpaceX Launches List"
          />
        </IconButton>
        <S.StyledTypography variant="h6" noWrap>
          SpaceX Launches List
        </S.StyledTypography>

        <S.Grow />

        <IconButton aria-label="open filters drawer" color="inherit">
          <FilterList />
        </IconButton>
      </Toolbar>
    </S.StyledAppBar>
  </S.Grow>
);

const S = {
  Grow: styled.div`
    flex-grow: 1;
  `,

  StyledAppBar: styled(AppBar)`
    & > div {
      background-color: var(--color-primary);
    }
  `,

  StyledTypography: styled(Typography)`
    display: none;

    @media screen and (min-width: ${`${muiBreakpoints.sm}px`}) {
      display: block;
      margin-right: calc(var(--spacing-unit) * 2);
    }
  `,
};

export default NavBar;
