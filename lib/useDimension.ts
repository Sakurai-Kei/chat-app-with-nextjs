import { RefObject, useEffect, useState } from "react";

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({
    current: { width: 0, height: 0 },
  });

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    setDimensions({
      current: {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      },
    });
  }, [ref]);

  return dimensions.current;
};
