import { useEffect, useState } from 'react';

export const useGetLocalStroageItem = (key: string) => {
  const [item, setItem] = useState<any>();

  useEffect(() => {
    setItem(getLocalStorageItem());
  }, []);

  const getLocalStorageItem = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : '';
  };

  return item;
};

export const useSetLocalStroageItem = <T>(key: string, value: T) => {
  useEffect(() => {
    setLocalStorageItem();
  }, []);

  const setLocalStorageItem = () => {
    localStorage.setItem(key, JSON.stringify(value));
  };
};

export const useRemoveLocalStorageItem = (key: string) => {
  useEffect(() => {
    removeLocalStorageItem();
  }, []);

  const removeLocalStorageItem = () => {
    localStorage.removeItem(key);
  };
};
