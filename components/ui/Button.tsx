'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white';
  
  const variantStyles = {
    primary:
      'bg-primary-blue text-white shadow-soft hover:bg-primary-dark hover:shadow-[0_0_35px_rgba(37,99,235,0.45)] hover:-translate-y-[1px]',
    secondary: 'bg-cyber-gray text-white hover:bg-cyber-black',
    outline:
      'border border-primary-blue/70 text-primary-blue hover:bg-primary-blue hover:text-white hover:border-primary-blue',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
