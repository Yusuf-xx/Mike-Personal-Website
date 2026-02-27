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
      className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${
        hover
          ? 'hover:shadow-soft hover:-translate-y-1 hover:scale-[1.01] hover:border-primary-blue/60 transition-transform transition-shadow transition-colors duration-300'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
