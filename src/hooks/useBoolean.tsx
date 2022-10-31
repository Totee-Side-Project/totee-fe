import { useState } from 'react';

export const useBoolean = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue);

  const open = () => setValue(true);
  const close = () => setValue(false);
  const toggle = () => setValue((state) => !state);

  return { value, open, close, toggle };
};
