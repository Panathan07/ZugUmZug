import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  storageKey: string,
  fallbackState: null,
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
  const localStorageValue = localStorage.getItem(storageKey);
  const [value, setValue] = useState<T | null>(
    localStorageValue ? (JSON.parse(localStorageValue) as T) : fallbackState,
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
