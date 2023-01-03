import React, { Dispatch, SetStateAction, useEffect } from 'react';

export function useClickOutside(
  targetElementId: string,
  isShow: boolean,
  setIsShow: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    if (!isShow) return;
    isShow &&
      window.addEventListener(
        'click',
        (e: any) => e.target.id == targetElementId && setIsShow(false),
      );
  }, []);
}

export default useClickOutside;
