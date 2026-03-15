'use client';

import { useEffect, useMemo, useState } from 'react';

type TitlePayload = {
  weights: Record<string, number>;
  [category: string]:
    | Record<string, number>
    | {
        openers: string[];
        middles: string[];
        closers: string[];
      };
};

const OBFUSCATED_TITLE_PAYLOAD =
  'eyJ3ZWlnaHRzIjp7ImZyZWUiOjMwLCJidWlsZGVyIjoyNCwic3BlZWQiOjIwLCJmdW5ueSI6MTQsImxhdW5jaCI6OCwiY29tcGFyZSI6NH0sImZyZWUiOnsib3BlbmVycyI6WyJDb21wbGV0ZWx5IGZyZWUiLCJObyBjYXJkIHJlcXVpcmVkIiwiRnJlZSBtZWFucyBmcmVlIiwiQnVpbGQgZm9yIHplcm8iLCJTdGFydCBmcmVlIiwiTm8gcGF5d2FsbCBoZXJlIiwiRnJlZSBmcm9tIHRoZSBzdGFydCIsIlplcm8tZG9sbGFyIHdlYnNpdGUgYnVpbGRlciJdLCJtaWRkbGVzIjpbImZvciByZWFsIHdlYnNpdGVzIiwid2l0aCBBSSBjaGF0IGFuZCBwcmV2aWV3Iiwid2l0aCBleHBvcnRzIGJ1aWx0IGluIiwid2l0aCBtb2RlbCBzd2l0Y2hpbmciLCJmb3IgbGFuZGluZyBwYWdlcyIsImZvciB5b3VyIG5leHQgbGF1bmNoIiwiZm9yIHlvdXIgZmlyc3QgZHJhZnQiLCJmb3IgdGhlIHdob2xlIHdvcmtmbG93Il0sImNsb3NlcnMiOlsid2l0aCBDb2RlRnJlZWQuIiwicmlnaHQgbm93LiIsIndpdGhvdXQgdGhlIGNhdGNoLiIsImFuZCBrZWVwIGdvaW5nLiIsImFuZCBzdGlsbCBzaGlwIGZhc3QuIiwiZnJvbSBkYXkgb25lLiIsIndpdGhvdXQgcGF5aW5nIGZpcnN0LiIsImZvciBhcyBsb25nIGFzIHlvdSBuZWVkLiJdfSwiYnVpbGRlciI6eyJvcGVuZXJzIjpbIlByb21wdCBpdCBvbmNlIiwiQnVpbGQgdGhlIGRyYWZ0IGZhc3QiLCJHZW5lcmF0ZSwgdGhlbiByZWZpbmUiLCJVc2UgQUkgbGlrZSBhIGJ1aWxkZXIiLCJLZWVwIHRoZSBzYW1lIHByb2plY3QgbW92aW5nIiwiQ2hhdCB5b3VyIHdheSB0byBhIHdlYnNpdGUiLCJTdGFydCB3aXRoIGEgcHJvbXB0IiwiVHVybiBpZGVhcyBpbnRvIHBhZ2VzIl0sIm1pZGRsZXMiOlsid2l0aCBjaGF0IGFuZCBwcmV2aWV3Iiwid2l0aCBmaWxlcyB5b3UgY2FuIGV4cG9ydCIsIndpdGggcmVhbCB3ZWJzaXRlIHRvb2xzIiwid2l0aCBtb2RlbCBzd2l0Y2hpbmcgYnVpbHQgaW4iLCJ3aXRob3V0IGxlYXZpbmcgdGhlIHdvcmtzcGFjZSIsIndpdGggdXBsb2FkcyBhbmQgZWRpdHMiLCJ3aXRoIElERSBtb2RlIHJlYWR5Iiwid2l0aCByb29tIHRvIGl0ZXJhdGUiXSwiY2xvc2VycyI6WyJpbnNpZGUgQ29kZUZyZWVkLiIsImZyb20gc3RhcnQgdG8gZmluaXNoLiIsIndpdGhvdXQgc3RhcnRpbmcgb3Zlci4iLCJ3aXRob3V0IGV4dHJhIHRvb2xzLiIsIndpdGhvdXQgbG9zaW5nIGNvbnRyb2wuIiwid2l0aCB0aGUgc2FtZSB3b3JrZmxvdy4iLCJ3aGlsZSBpdCBzdGF5cyBzaW1wbGUuIiwiYW5kIGtlZXAgaW1wcm92aW5nIGl0LiJdfSwic3BlZWQiOnsib3BlbmVycyI6WyJMYXVuY2ggZmFzdGVyIiwiQnVpbGQgZmFzdGVyIiwiU2hpcCB0aGUgZmlyc3QgdmVyc2lvbiBzb29uZXIiLCJHZXQgdG8gYSB3b3JraW5nIHNpdGUgZmFzdGVyIiwiTW92ZSBmcm9tIGlkZWEgdG8gc2l0ZSBmYXN0ZXIiLCJTa2lwIHRoZSBzbG93IHNldHVwIiwiQ3V0IHRoZSBib3JpbmcgcGFydCIsIkdldCB0aGUgZHJhZnQgZG9uZSB0b2RheSJdLCJtaWRkbGVzIjpbIndpdGggQUkgZG9pbmcgdGhlIGhlYXZ5IGxpZnRpbmciLCJ3aXRoIGEgYnVpbGRlciBtYWRlIGZvciB3ZWJzaXRlcyIsIndpdGhvdXQgdGhlIHVzdWFsIGRyYWciLCJ3aXRoIHByZXZpZXcgYnVpbHQgaW4iLCJ3aXRob3V0IHBheWluZyBmaXJzdCIsIndpdGggZXhwb3J0cyByZWFkeSIsIndpdGggbGVzcyBiYWNrLWFuZC1mb3J0aCIsIndpdGhvdXQgbG9zaW5nIHRoZSBmaWxlcyJdLCJjbG9zZXJzIjpbInVzaW5nIENvZGVGcmVlZC4iLCJhbmQga2VlcCB0aGUgbW9tZW50dW0uIiwid2l0aG91dCB0aGUgbWVzcy4iLCJhbmQgc3RpbGwgc3RheSBpbiBjb250cm9sLiIsIndoaWxlIGl0IHN0YXlzIGZyZWUuIiwiYmVmb3JlIHRoZSBpZGVhIGNvb2xzIG9mZi4iLCJ3aXRob3V0IHRoZSBleHRyYSBjb3N0LiIsIndpdGggYSBjbGVhbmVyIHdvcmtmbG93LiJdfSwiZnVubnkiOnsib3BlbmVycyI6WyJZb3VyIG5leHQgc2l0ZSIsIkFwcGFyZW50bHkgd2Vic2l0ZXMiLCJCYWQgbmV3cyBmb3Igc2xvdyBidWlsZGVycyIsIllvdXIgc2lkZSBwcm9qZWN0IiwiVGhlIGJyb3dzZXIgd291bGQgbGlrZSB0byBzYXkiLCJUdXJucyBvdXQgd2ViIGxhdW5jaGVzIiwiVGhpcyBwYWdlIGhhcyBhIHRoZW9yeSIsIkEgdGlueSBtaXJhY2xlIGhhcHBlbmVkIl0sIm1pZGRsZXMiOlsiZG9lcyBub3QgbmVlZCBhIGNvbW1pdHRlZSIsImNhbiBzaGlwIGJlZm9yZSB5b3VyIGNvZmZlZSBjb29scyIsInNob3VsZCBub3QgY29zdCByZW50IG1vbmV5IiwibG9va3MgYmV0dGVyIHdpdGggQUkgaGVscCIsImRvZXMgbm90IG5lZWQgdGhyZWUgdG9vbHMiLCJjYW4gc3RvcCBiZWluZyBhIHdlZWtlbmQgcHJvamVjdCIsInNob3VsZCBiZSBlYXNpZXIgdGhhbiB0aGlzIiwid29ya3MgYmV0dGVyIHdpdGggbGVzcyBjaGFvcyJdLCJjbG9zZXJzIjpbIkNvZGVGcmVlZCBhZ3JlZXMuIiwiYW5kIHRoYXQgZmVlbHMgbmljZS4iLCJmb3Igb25jZS4iLCJzbyB3ZSBidWlsdCB0aGlzLiIsInlvdSBhcmUgd2VsY29tZS4iLCJ3aXRoIGxlc3MgZHJhbWEuIiwiZmluYWxseS4iLCJhbmQgd2Ugc3VwcG9ydCB0aGF0LiJdfSwibGF1bmNoIjp7Im9wZW5lcnMiOlsiTWFrZSB0aGUgbGFuZGluZyBwYWdlIiwiQnVpbGQgdGhlIGxhdW5jaCBzaXRlIiwiU3RhcnQgdGhlIHByb2R1Y3QgcGFnZSIsIkNyZWF0ZSB0aGUgZmlyc3QgdmVyc2lvbiIsIkRyYWZ0IHRoZSBzaXRlIHRvZGF5IiwiR2V0IHRoZSB3ZWJzaXRlIGxpdmUgZmFzdGVyIiwiTW92ZSB0aGUgaWRlYSBmb3J3YXJkIiwiQnVpbGQgd2hhdCB5b3Ugd2VyZSBwaWN0dXJpbmciXSwibWlkZGxlcyI6WyJ3aXRoIEFJLCBwcmV2aWV3LCBhbmQgZXhwb3J0Iiwid2l0aCBhIHNpbXBsZXIgd29ya2Zsb3ciLCJ3aXRoIHRvb2xzIHRoYXQgZml0IHRoZSBqb2IiLCJ3aXRoIHJlYWwgZmlsZXMgYmVoaW5kIGl0Iiwid2l0aCByb29tIHRvIHJldmlzZSIsIndpdGggbGVzcyB3YWl0aW5nIGFyb3VuZCIsIndpdGggb25lIHdvcmtzcGFjZSIsIndpdGggZmFzdGVyIGZlZWRiYWNrIl0sImNsb3NlcnMiOlsiaW5zaWRlIENvZGVGcmVlZC4iLCJ3aXRob3V0IHRoZSBleHRyYSBmcmljdGlvbi4iLCJhbmQga2VlcCBpdGVyYXRpbmcuIiwiYmVmb3JlIGxhdW5jaCBkYXkgaGl0cy4iLCJ3aXRob3V0IGhpcmluZyBhIHdob2xlIHRlYW0gZmlyc3QuIiwiYW5kIHN0aWxsIHN0YXkgZmxleGlibGUuIiwid2l0aG91dCB0aGUgdXN1YWwgc2xvd2Rvd24uIiwiZnJvbSB0aGUgc2FtZSBwcm9qZWN0LiJdfSwiY29tcGFyZSI6eyJvcGVuZXJzIjpbIldoeSBwYXkgZm9yIEJhc2U0NCIsIkJhc2U0NCBjb3N0cyBtb25leSIsIklmIEJhc2U0NCB3YW50cyBhIGJ1ZGdldCIsIllvdSBjb3VsZCBza2lwIHRoZSBCYXNlNDQgYmlsbCJdLCJtaWRkbGVzIjpbIndoZW4gQ29kZUZyZWVkIGlzIGZyZWUiLCJpZiB5b3UganVzdCBuZWVkIGEgd2Vic2l0ZSBidWlsZGVyIiwid2hlbiB0aGUgd29ya2Zsb3cgY2FuIGNvc3QgemVybyIsImlmIHRoZSBmaXJzdCBkcmFmdCBzaG91bGQgbm90IG5lZWQgYSBwbGFuIl0sImNsb3NlcnMiOlsiYW5kIHN0YXJ0IGhlcmUgaW5zdGVhZC4iLCJ0aGF0IGlzIGEgc3Ryb25nIGNvbXBhcmlzb24uIiwiZnJlZSBpcyBhIHNlcmlvdXMgZmVhdHVyZS4iLCJ0aGUgbWF0aCBnZXRzIGVhc3kgZmFzdC4iXX19';

const HOME_DESCRIPTION = 'Build, compare, iterate, and launch websites with AI for free.';
function decodePayload() {
  const raw = atob(OBFUSCATED_TITLE_PAYLOAD);
  return JSON.parse(raw) as TitlePayload;
}

function combineTitles(payload: TitlePayload) {
  const pools = Object.entries(payload.weights).flatMap(([category, weight]) => {
    const group = payload[category] as { openers: string[]; middles: string[]; closers: string[] };
    return group.openers.flatMap((opener) =>
      group.middles.flatMap((middle) =>
        group.closers.map((closer) => ({
          value: `${opener} ${middle} ${closer}`,
          weight
        }))
      )
    );
  });

  return pools.filter((item) => item.value.length <= 78);
}

function pickWeightedTitle(pool: Array<{ value: string; weight: number }>, recent: string[]) {
  const filtered = pool.filter((item) => !recent.includes(item.value));
  const source = filtered.length ? filtered : pool;
  const total = source.reduce((sum, item) => sum + item.weight, 0);
  let target = Math.random() * total;

  for (const item of source) {
    target -= item.weight;
    if (target <= 0) {
      return item.value;
    }
  }

  return source[0]?.value ?? 'CodeFreed builds websites with AI for free.';
}

export function HomeTitleRotator() {
  const titlePool = useMemo(() => combineTitles(decodePayload()), []);
  const [headline, setHeadline] = useState('Turn a prompt into a real website.');

  useEffect(() => {
    const next = pickWeightedTitle(titlePool, []);
    setHeadline(next);

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', HOME_DESCRIPTION);
    }
  }, [titlePool]);

  return (
    <h1 className="text-5xl font-semibold leading-tight text-slate-900 dark:text-white md:text-6xl">
      {headline}
    </h1>
  );
}
