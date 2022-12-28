import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entrie) => {
      if (entrie.isIntersecting) callback();
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref.current]);

  return { ref, observer };
};
