import { useEffect, useState } from 'react';

export default function useDebounceInput(value: string, delay = 200) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setInputValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return { inputValue, setInputValue };
}
