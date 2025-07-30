import React from 'react';
import cn from '../utils/clsx';

export function Grid({ children, cols = 2, gap = 4, className }) {
  return (
    <div
      className={cn(
        `grid grid-cols-1 sm:grid-cols-${cols} gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}
