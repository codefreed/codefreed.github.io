'use client';

import { useEffect, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function applyScrollMode(enabled: boolean) {
  document.documentElement.dataset.builderScroll = enabled ? 'on' : 'off';
}

export function ScrollToggle({ storageKey = 'codefreed-scroll-mode' }: { storageKey?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const next = saved ? saved === 'smooth' : false;
    setEnabled(next);
    applyScrollMode(next);
    setReady(true);
  }, [storageKey]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    applyScrollMode(next);
    window.localStorage.setItem(storageKey, next ? 'smooth' : 'auto');
  };

  return (
    <Button variant="secondary" size="sm" onClick={toggle} aria-pressed={enabled} title="Toggle builder page scrolling">
      <ArrowDownUp className="mr-1 h-4 w-4" />
      {ready ? (enabled ? 'Scroll On' : 'Scroll Off') : 'Scroll'}
    </Button>
  );
}
