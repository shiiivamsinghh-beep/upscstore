import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      // Always show at the top
      if (scrollY < 10) {
        setScrollDirection('up');
        lastScrollY = scrollY > 0 ? scrollY : 0;
        return;
      }

      // If scrolling UP, change immediately (no threshold) to feel snappy
      // If scrolling DOWN, wait for a small threshold (10px) to avoid jitter
      const threshold = direction === 'down' ? 10 : 0;

      const diff = Math.abs(scrollY - lastScrollY);

      if (diff >= threshold) {
        setScrollDirection(direction);
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  return scrollDirection;
}
