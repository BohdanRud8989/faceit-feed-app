import { useRef, useEffect, useCallback } from "react";
import { clearTimeout, setTimeout } from "timers";

export function useDebounce<T extends object[]>(
  callback: (...args: T) => void,
  delay = 500,
): (...args: T) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
