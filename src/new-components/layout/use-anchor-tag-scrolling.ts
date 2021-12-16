import { useEffect } from 'react';
import { HEADER_HEIGHT } from '../../components/header/header';

export const useAnchorTagScrolling = (): void => {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(
        `a[href*='${window.location.hash}']`,
      );
      if (target) {
        const scrollTop =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          // we need to scroll past the header and a little offset
          (Number.parseInt(HEADER_HEIGHT, 10) + 16);

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);
};
