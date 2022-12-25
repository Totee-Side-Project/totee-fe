import { useState } from 'react';

export const useBoolean = (defaultValue: boolean) => {
  const [isBoolean, setBoolean] = useState(defaultValue);

  const setOpen = () => setBoolean(true);
  const setClose = () => setBoolean(false);
  const setToggle = () => setBoolean((state) => !state);

  return { isBoolean, setOpen, setClose, setToggle };
};
