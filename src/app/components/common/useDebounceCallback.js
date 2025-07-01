import { useRef, useEffect } from "react";

export const useDebounceCallback = (callback, delay) => {
  const timer = useRef(null);

  const debounced = (...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(...args), delay);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return debounced;
};
