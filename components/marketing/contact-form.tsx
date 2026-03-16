'use client';

import { FormEvent, useState } from 'react';
import { SUPPORT_EMAIL } from '@/lib/site-config';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`CodeFreed contact from ${name || 'Website visitor'}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')
    );

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Name
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-2 min-h-[180px] w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="Tell us what you are building, what broke, or what you would like to see next."
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Open email draft
      </button>
    </form>
  );
}
