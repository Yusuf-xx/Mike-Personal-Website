'use client';

import { type ReactNode } from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  /** Omit for uncontrolled (e.g. form action submit) */
  value?: string;
  /** Omit for uncontrolled */
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Renders inside the input on the right (e.g. password visibility toggle) */
  trailing?: ReactNode;
}

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  trailing,
}: InputProps) {
  const isControlled = value !== undefined && onChange !== undefined;
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-charcoal mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          {...(isControlled ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) } : { defaultValue: '' })}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-border-muted rounded-sm focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy/30 disabled:bg-ivory disabled:cursor-not-allowed text-charcoal ${trailing ? 'pr-11' : ''}`}
        />
        {trailing && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
}
