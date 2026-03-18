'use client';

import { useEffect, useState } from 'react';

type Submission = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  flaggedReasons: string[];
  reviewNotes: string;
};

export function BlogModerationPanel() {
  const [token, setToken] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (nextToken = token) => {
    if (!nextToken.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/blog-submissions?status=pending', {
        headers: {
          'x-moderation-token': nextToken
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to load submissions.');
      }
      setSubmissions(data.submissions ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = window.localStorage.getItem('codefreed-blog-mod-token');
    if (saved) {
      setToken(saved);
      void load(saved);
    }
  }, []);

  const saveToken = async () => {
    window.localStorage.setItem('codefreed-blog-mod-token', token);
    await load(token);
  };

  const moderate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/blog-submissions/moderate', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-moderation-token': token
        },
        body: JSON.stringify({ id, status })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to update submission.');
      }
      setSubmissions((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update submission.');
    }
  };

  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-sm font-medium">Blog moderation queue</p>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
        Community articles stay private until approved. Use your moderation token to review pending submissions.
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          className="h-11 flex-1 rounded-2xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          placeholder="BLOG_MODERATION_TOKEN"
        />
        <button
          type="button"
          onClick={saveToken}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white"
        >
          Load queue
        </button>
      </div>

      {error ? <div className="mt-3 rounded-xl bg-rose-500/12 p-3 text-xs text-rose-700 dark:text-rose-200">{error}</div> : null}

      <div className="mt-4 space-y-3">
        {loading ? <p className="text-xs text-slate-500 dark:text-slate-400">Loading submissions...</p> : null}
        {!loading && submissions.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">No pending submissions yet.</p>
        ) : null}

        {submissions.map((submission) => (
          <div key={submission.id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-900/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{submission.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {submission.author} • {submission.category} • {submission.createdAt.slice(0, 10)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moderate(submission.id, 'approved')}
                  className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-200"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => moderate(submission.id, 'rejected')}
                  className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-700 dark:text-rose-200"
                >
                  Reject
                </button>
              </div>
            </div>
            {submission.flaggedReasons.length ? (
              <div className="mt-3 rounded-xl bg-amber-500/12 p-3 text-xs text-amber-700 dark:text-amber-200">
                {submission.flaggedReasons.join(' ')}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
