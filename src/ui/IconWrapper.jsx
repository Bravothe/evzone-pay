import React from 'react';
import cn from '../utils/clsx';

export default function IconWrapper({ children, size = 20, className }) {
  return (
    <span
      style={{ width: size, height: size, display: 'inline-block' }}
      className={cn('inline-flex items-center justify-center', className)}
    >
      {children}
    </span>
  );
}
