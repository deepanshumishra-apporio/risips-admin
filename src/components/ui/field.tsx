'use client';

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

const ControlClass =
  'w-full rounded-lg border border-line-strong bg-surface px-3 text-[13.5px] text-ink placeholder:text-ink-muted ' +
  'focus:border-brand focus:outline-none focus:ring-3 focus:ring-brand/12 transition-colors';

type FieldProps = {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({ label, hint, required, children, className }: FieldProps): React.JSX.Element {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 flex items-center gap-1 text-[13px] font-medium text-ink-soft">
        {label}
        {required ? <span className="text-danger">*</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-[12px] text-ink-muted">{hint}</span> : null}
    </label>
  );
}

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>): React.JSX.Element {
  return <input className={cn(ControlClass, 'h-10', className)} {...rest} />;
}

export function TextArea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>): React.JSX.Element {
  return <textarea className={cn(ControlClass, 'py-2.5 leading-relaxed', className)} rows={4} {...rest} />;
}

export function SelectInput({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>): React.JSX.Element {
  return (
    <select className={cn(ControlClass, 'h-10 appearance-none pr-8', className)} {...rest}>
      {children}
    </select>
  );
}
