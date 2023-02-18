import { useEffect, useState } from 'react';

/**
 * 화면 너비가 지정한 값보다 작은 경우를 체크하는 Hook
 * @param width 화면의 너비를 나타내는 숫자
 * @returns isCurrentMobileWidth: 현재 화면이 모바일 뷰인지 아닌지 여부를 나타내는 boolean 값
 */
export const useMobileView = (width: number) => {
  const [isCurrentMobileWidth, setIsCurrentMobileWidth] = useState(
    () => window.innerWidth < width,
  );

  useEffect(() => {
    const mobileWidth = window.matchMedia(`screen and (max-width:${width}px)`);
    const handleScreenChange = (event: MediaQueryListEvent) => {
      setIsCurrentMobileWidth(event.matches);
    };

    mobileWidth.addEventListener('change', handleScreenChange);
    return () => mobileWidth.removeEventListener('change', handleScreenChange);
  }, [width]);

  return isCurrentMobileWidth;
};
