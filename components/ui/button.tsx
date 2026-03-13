'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'glass text-slate-900 dark:text-slate-100 hover:-translate-y-0.5 hover:shadow-glow',
        secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
        ghost: 'text-slate-700 hover:bg-white/20 dark:text-slate-200 dark:hover:bg-slate-700/40',
        danger: 'bg-rose-500/80 text-white hover:bg-rose-500'
      },
      size: {
        default: 'h-10',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
