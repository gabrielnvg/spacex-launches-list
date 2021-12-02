import styled from 'styled-components';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

interface ScrollTopProps {
  children: React.ReactNode;
}

const ScrollTop: React.FC<ScrollTopProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target: any = e.target;
    const anchor = (target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <S.ClickArea onClick={handleClick} role="presentation">
        {children}
      </S.ClickArea>
    </Zoom>
  );
};

const S = {
  ClickArea: styled.div`
    position: fixed;
    bottom: calc(var(--spacing-unit) * 2);
    right: calc(var(--spacing-unit) * 2);
  `,
};

export default ScrollTop;
