import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  ignoreRef: RefObject<HTMLElement> | null = null,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (ignoreRef?.current && ignoreRef.current.contains(event.target as Node)) {
          return;
        }
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, ignoreRef, onClickOutside]);
};
