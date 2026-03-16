'use client';

import { FormEvent, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  author: '',
  email: '',
  category: 'AI Website Builders',
  content: ''
};

export function BlogSubmitForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('/api/blog-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit article.');
      }

      setResult({
        tone: 'success',
        message:
          data.flaggedReasons?.length > 0
            ? 'Your article was submitted and flagged for manual review before publishing.'
            : 'Your article was submitted for review. It will stay private until approved.'
      });
      setForm(initialState);
    } catch (error) {
      setResult({
        tone: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit article.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="h-12 rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="Article title"
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          required
        />
        <input
          className="h-12 rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="Author name"
          value={form.author}
          onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
        <input
          type="email"
          className="h-12 rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <select
          className="h-12 rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          value={form.category}
          onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
        >
          <option>AI Website Builders</option>
          <option>No-Code Tools</option>
          <option>Web Development Tips</option>
          <option>Launch Stories</option>
          <option>Design and UX</option>
        </select>
      </div>

      <textarea
        className="min-h-[96px] w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
        placeholder="Short summary for the article card and SEO description"
        value={form.description}
        onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        required
      />

      <textarea
        className="min-h-[280px] w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
        placeholder="Paste the article body here. Use blank lines between paragraphs and optional headings like ## My Heading."
        value={form.content}
        onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
        required
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
          Submissions are filtered before publishing. There is no hard upper limit, but very short or spammy posts are still flagged automatically.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Submitting...' : 'Submit for review'}
        </button>
      </div>

      {result ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            result.tone === 'success'
              ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-200'
              : 'bg-rose-500/12 text-rose-700 dark:text-rose-200'
          }`}
        >
          {result.message}
        </div>
      ) : null}
    </form>
  );
}
