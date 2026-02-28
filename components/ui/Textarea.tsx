'use client';

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 4
}: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-charcoal mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className="w-full px-4 py-3 border border-border-muted rounded-sm focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy/30 disabled:bg-ivory disabled:cursor-not-allowed resize-vertical text-charcoal"
      />
    </div>
  );
}
