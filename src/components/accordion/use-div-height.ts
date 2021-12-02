import { useEffect, useState } from 'react';

/**
 * Lovely height measurement, from here:
 * https://github.com/raunofreiberg/reach-ui/blob/6742f0cdcef05ba23077f63c21e3ede3bbfcae52/packages/accordion/examples/animated.example.js#L19-L39
 */
export function useDivHeight(ref) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        if (!entry) {
          return;
        }
        setHeight(entry.target.getBoundingClientRect().height);
      });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, height };
}
