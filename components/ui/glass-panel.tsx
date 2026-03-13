import { cn } from '@/lib/utils/cn';

export function GlassPanel({
  className,
  variant = 'card',
  children
}: {
  className?: string;
  variant?: 'sidebar' | 'card' | 'modal';
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'glass noise-overlay rounded-3xl',
        variant === 'sidebar' && 'p-3',
        variant === 'card' && 'p-4',
        variant === 'modal' && 'p-6',
        className
      )}
    >
      {children}
    </section>
  );
}
