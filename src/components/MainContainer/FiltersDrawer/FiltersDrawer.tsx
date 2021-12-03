import styled from 'styled-components';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { breakpoints } from '../../../utils/breakpoints';
import { toggleFiltersDrawer } from '../../../redux/modules/filtersDrawer';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

const FiltersDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const filtersDrawerState = useSelector(
    (state: RootState) => state.filtersDrawer,
  );
  const { isDrawerOpen } = filtersDrawerState;

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => {
        dispatch(toggleFiltersDrawer(false));
      }}
    >
      <S.DrawerContainer role="presentation">
        <S.DrawerHeader>
          <span>Filters</span>
          <IconButton
            onClick={() => {
              dispatch(toggleFiltersDrawer(false));
            }}
          >
            <S.StyledChevronRightIcon />
          </IconButton>
        </S.DrawerHeader>

        <Divider />

        <S.DrawerMainContent>FILTERS HERE</S.DrawerMainContent>
      </S.DrawerContainer>
    </Drawer>
  );
};

const S = {
  DrawerContainer: styled.div`
    position: relative;
    width: 295px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media screen and (min-width: ${`${breakpoints.xxs}px`}) {
      width: 375px;
    }

    @media screen and (min-width: ${`${breakpoints.xs}px`}) {
      width: 400px;
    }
  `,

  DrawerHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 calc(var(--spacing-unit) * 2);
    background-color: var(--color-primary);
    letter-spacing: 0.0075em;
    color: #ffffff;

    @media screen and (min-width: ${`${breakpoints.xs}px`}) {
      padding: 0 calc(var(--spacing-unit) * 2);
      font-size: 1.25rem;
      line-height: 1.6px;
      font-weight: 500px;
    }
  `,

  StyledChevronRightIcon: styled(ChevronRightIcon)`
    color: #ffffff;
  `,

  DrawerMainContent: styled.div`
    overflow: 'auto';
  `,
};

export default FiltersDrawer;
