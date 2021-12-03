import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleFiltersDrawer } from '../../../redux/modules/filtersDrawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterList from '@material-ui/icons/FilterList';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
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
          <S.TypographyContainer>
            <Typography variant="h1" noWrap>
              SpaceX Launches List
            </Typography>
          </S.TypographyContainer>

          <S.Grow />

          <IconButton
            aria-label="open filters drawer"
            color="inherit"
            onClick={() => {
              dispatch(toggleFiltersDrawer(true));
            }}
          >
            <FilterList />
          </IconButton>
        </Toolbar>
      </S.StyledAppBar>
    </S.Grow>
  );
};

const S = {
  Grow: styled.div`
    flex-grow: 1;
  `,

  StyledAppBar: styled(AppBar)`
    & > div {
      background-color: var(--color-primary);
    }
  `,

  TypographyContainer: styled.div`
    overflow: hidden;

    & > h1 {
      font-weight: 500;
      font-size: 1.25rem;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    }
  `,
};

export default NavBar;
