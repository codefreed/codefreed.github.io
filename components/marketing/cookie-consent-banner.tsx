'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'codefreed-cookie-consent';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    setVisible(storedValue !== 'accepted');
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/88">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Cookie notice</p>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            CodeFreed uses cookies and similar technologies to remember preferences, improve performance, and support advertising compliance.
            By continuing to use the site, you agree to this use as described in our Privacy Policy.
          </p>
        </div>
        <button
          type="button"
          onClick={accept}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
