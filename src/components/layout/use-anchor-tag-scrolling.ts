import { useEffect } from 'react';
import { HEADER_HEIGHT_VALUE } from './theme';

// we need to scroll past the header and a little offset
export const SCROLLING_OFFSET = HEADER_HEIGHT_VALUE + 50;

export const useAnchorTagScrolling = (): void => {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(
        `a[href*='${window.location.hash}']`,
      );
      scrollToTarget(target);
    }
  }, []);
};

export const scrollToTarget = (target: Element | null) => {
  if (!target) {
    console.error(`Expected Element, but got: ${target}`);
    return;
  }

  const scrollTop =
    target.getBoundingClientRect().top + window.pageYOffset - SCROLLING_OFFSET;

  window.scrollTo({
    top: scrollTop,
    behavior: 'smooth',
  });
};
