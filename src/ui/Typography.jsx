import React from 'react';
import cn from '../utils/clsx';

export function H1({ children, className }) {
  return <h1 className={cn('text-2xl font-bold', className)}>{children}</h1>;
}

export function Body({ children, className }) {
  return <p className={cn('text-base', className)}>{children}</p>;
}
