'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils/cn';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List className={cn('glass inline-flex rounded-2xl p-1', className)} {...props} />
);

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'rounded-xl px-3 py-1.5 text-sm text-slate-700 transition data-[state=active]:bg-white/60 data-[state=active]:text-slate-900 dark:text-slate-200 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white',
      className
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={cn('mt-3', className)} {...props} />
);
