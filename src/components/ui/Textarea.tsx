import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500 focus:ring-red-500' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {(helperText || error) && (
          <p
            className={cn(
              'mt-1 text-xs',
              error ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;