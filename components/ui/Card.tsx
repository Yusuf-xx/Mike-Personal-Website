'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white border border-border-muted rounded-none p-6 shadow-card ${
        hover
          ? 'transition-shadow duration-200 hover:shadow-soft hover:border-navy/15'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
