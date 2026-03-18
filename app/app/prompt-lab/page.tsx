'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { AppShell } from '@/components/layout/app-shell';
import { GlassPanel } from '@/components/ui/glass-panel';
import { AI_MODELS, getAiModelLabel, type AiModel, type PromptBuilderResponsePayload } from '@/lib/ai/schema';
import { IS_STATIC_EXPORT } from '@/lib/runtime';

const WEBSITE_TYPES = [
  'SaaS',
  'Startup Landing Page',
  'Portfolio',
  'Agency',
  'Ecommerce',
  'Blog or Magazine',
  'Event or Community',
  'Restaurant or Local Business',
  'Nonprofit',
  'Personal Brand',
  'Real Estate',
  'Education or Course',
  'Mobile App Promo',
  'Directory or Marketplace',
  'Fitness or Wellness',
  'Travel or Hospitality',
  'Custom'
] as const;

const FEATURE_MAP: Record<(typeof WEBSITE_TYPES)[number], string[]> = {
  SaaS: ['Pricing', 'FAQ', 'Dashboard preview', 'Testimonials', 'Integrations', 'Contact'],
  'Startup Landing Page': ['Waitlist form', 'Features', 'Roadmap', 'Social proof', 'FAQ', 'Contact'],
  Portfolio: ['Case studies', 'About section', 'Services', 'Testimonials', 'Contact form', 'Resume link'],
  Agency: ['Services', 'Case studies', 'Process', 'Team', 'Pricing', 'Contact'],
  Ecommerce: ['Featured products', 'Categories', 'Reviews', 'Shipping details', 'FAQ', 'Email signup'],
  'Blog or Magazine': ['Categories', 'Featured posts', 'Newsletter', 'Author bios', 'Search', 'About'],
  'Event or Community': ['Schedule', 'Speakers', 'Tickets', 'Sponsors', 'FAQ', 'Contact'],
  'Restaurant or Local Business': ['Menu or services', 'Location map', 'Reviews', 'Reservations', 'Hours', 'Contact'],
  Nonprofit: ['Mission', 'Impact stats', 'Donate CTA', 'Volunteer section', 'Stories', 'Contact'],
  'Personal Brand': ['About', 'Speaking', 'Newsletter', 'Media kit', 'Testimonials', 'Contact'],
  'Real Estate': ['Listings', 'Neighborhood guides', 'Agent bio', 'Lead form', 'Testimonials', 'FAQ'],
  'Education or Course': ['Curriculum', 'Instructor bio', 'Pricing', 'Student outcomes', 'FAQ', 'Enrollment CTA'],
  'Mobile App Promo': ['App benefits', 'Screenshots', 'Download CTA', 'Pricing', 'FAQ', 'Testimonials'],
  'Directory or Marketplace': ['Categories', 'Search', 'Featured listings', 'How it works', 'FAQ', 'Contact'],
  'Fitness or Wellness': ['Programs', 'Results', 'Trainer bios', 'Memberships', 'FAQ', 'Booking CTA'],
  'Travel or Hospitality': ['Destinations', 'Rooms or packages', 'Gallery', 'Reviews', 'FAQ', 'Booking CTA'],
  Custom: ['Hero section', 'Features', 'FAQ', 'Testimonials', 'About', 'Contact']
};

const STYLE_MAP: Record<(typeof WEBSITE_TYPES)[number], string[]> = {
  SaaS: ['Clean enterprise', 'Premium dark', 'Playful product', 'Minimal modern'],
  'Startup Landing Page': ['Bold launch', 'Futuristic neon', 'Editorial minimal', 'Friendly startup'],
  Portfolio: ['Art direction', 'Minimal editorial', 'Brutalist creative', 'Premium personal brand'],
  Agency: ['Sharp corporate', 'Creative studio', 'Luxury service', 'High-contrast modern'],
  Ecommerce: ['Luxury retail', 'Warm lifestyle', 'Bold conversion-focused', 'Clean catalog'],
  'Blog or Magazine': ['Editorial newspaper', 'Modern publication', 'Warm storytelling', 'Minimal reading-first'],
  'Event or Community': ['High-energy promo', 'Community friendly', 'Conference polished', 'Nightlife cinematic'],
  'Restaurant or Local Business': ['Warm hospitality', 'Premium dining', 'Playful local', 'Clean service business'],
  Nonprofit: ['Hopeful human-centered', 'Documentary storytelling', 'Trust-first modern', 'Warm community'],
  'Personal Brand': ['Premium editorial', 'Confident modern', 'Minimal luxury', 'Creative authority'],
  'Real Estate': ['Luxury listing', 'Trust-first corporate', 'Warm local expert', 'Minimal premium'],
  'Education or Course': ['Academic polished', 'Friendly learning', 'Premium cohort', 'Modern knowledge brand'],
  'Mobile App Promo': ['App-store polished', 'Bold startup', 'Futuristic glass', 'Minimal product'],
  'Directory or Marketplace': ['Utility-first clean', 'Modern editorial', 'High-trust minimal', 'Premium platform'],
  'Fitness or Wellness': ['Energetic modern', 'Calm premium wellness', 'Bold coaching brand', 'Clean results-focused'],
  'Travel or Hospitality': ['Luxury escape', 'Warm boutique', 'Adventure editorial', 'Minimal destination'],
  Custom: ['Minimal modern', 'Bold premium', 'Playful startup', 'Editorial luxury']
};

type PromptMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function PromptLabPage() {
  const [siteName, setSiteName] = useState('');
  const [websiteType, setWebsiteType] = useState<(typeof WEBSITE_TYPES)[number]>('SaaS');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Pricing', 'FAQ', 'Testimonials']);
  const [selectedStyle, setSelectedStyle] = useState(STYLE_MAP.SaaS[0]);
  const [customStyleNotes, setCustomStyleNotes] = useState('');
  const [audience, setAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedModel, setSelectedModel] = useState<AiModel>('gpt-4.1');
  const [promptDraft, setPromptDraft] = useState('');
  const [messages, setMessages] = useState<PromptMessage[]>([]);
  const [refinement, setRefinement] = useState('');
  const [working, setWorking] = useState(false);

  const features = useMemo(() => FEATURE_MAP[websiteType], [websiteType]);
  const styles = useMemo(() => STYLE_MAP[websiteType], [websiteType]);

  const callPromptBuilder = async (payload: Record<string, unknown>) => {
    const response = await fetch('/api/prompt-builder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as PromptBuilderResponsePayload & { error?: string };
    if (!response.ok) {
      throw new Error(data.error || 'Prompt builder failed.');
    }

    return data;
  };

  const generatePrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (IS_STATIC_EXPORT) {
      toast.error('Prompt Lab needs a server deployment such as Vercel.');
      return;
    }

    try {
      setWorking(true);
      const result = await callPromptBuilder({
        mode: 'generate',
        model: selectedModel,
        siteName,
        websiteType,
        selectedFeatures,
        selectedStyle,
        customStyleNotes,
        audience,
        goals,
        notes
      });

      setPromptDraft(result.prompt_draft);
      setMessages([{ role: 'assistant', content: result.assistant_message }]);
      toast.success('Prompt draft created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not generate prompt draft');
    } finally {
      setWorking(false);
    }
  };

  const refinePrompt = async () => {
    if (!refinement.trim() || IS_STATIC_EXPORT) {
      if (IS_STATIC_EXPORT) {
        toast.error('Prompt Lab needs a server deployment such as Vercel.');
      }
      return;
    }

    try {
      setWorking(true);
      const nextHistory = [...messages, { role: 'user' as const, content: refinement.trim() }];
      setMessages(nextHistory);

      const result = await callPromptBuilder({
        mode: 'refine',
        model: selectedModel,
        siteName,
        websiteType,
        selectedFeatures,
        selectedStyle,
        customStyleNotes,
        audience,
        goals,
        notes,
        currentPrompt: promptDraft,
        refinementMessage: refinement.trim(),
        chatHistory: nextHistory
      });

      setPromptDraft(result.prompt_draft);
      setMessages([...nextHistory, { role: 'assistant', content: result.assistant_message }]);
      setRefinement('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not refine prompt');
    } finally {
      setWorking(false);
    }
  };

  return (
    <AppShell contentClassName="grid min-h-0 grid-rows-[auto_1fr] gap-4">
      <>
        <GlassPanel className="flex flex-wrap items-center justify-between gap-3 rounded-3xl p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">Prompt Lab</p>
            <h1 className="text-2xl font-semibold">Build a better website prompt first</h1>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex flex-wrap gap-2">
              {AI_MODELS.map((model) => {
                const active = selectedModel === model;
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setSelectedModel(model as AiModel)}
                    className={`inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium transition ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-700 shadow-[0_12px_30px_rgba(34,211,238,0.16)] dark:text-cyan-200'
                        : 'bg-white/70 text-slate-700 hover:bg-white/90 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-900/80'
                    }`}
                  >
                    {getAiModelLabel(model)}
                  </button>
                );
              })}
            </div>
            <Link
              href="/app"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-white/70 px-4 text-sm font-medium text-slate-900 dark:bg-slate-900/60 dark:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Studio
            </Link>
          </div>
        </GlassPanel>

        <section className="grid min-h-0 gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassPanel className="overflow-y-auto rounded-3xl p-5">
            <form onSubmit={generatePrompt} className="space-y-5">
              <div>
                <label className="text-sm font-medium">Site name</label>
                <input
                  value={siteName}
                  onChange={(event) => setSiteName(event.target.value)}
                  className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-white/70 px-4 text-sm text-slate-900 outline-none dark:bg-slate-900/60 dark:text-white"
                  placeholder="Name the website or brand"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Website type</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {WEBSITE_TYPES.map((type) => {
                    const active = websiteType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setWebsiteType(type);
                          setSelectedFeatures(FEATURE_MAP[type].slice(0, 3));
                          setSelectedStyle(STYLE_MAP[type][0]);
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                          active
                            ? 'bg-cyan-500/15 text-cyan-700 shadow-[0_12px_30px_rgba(34,211,238,0.16)] dark:text-cyan-200'
                            : 'bg-white/70 text-slate-700 hover:bg-white/90 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-900/80'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Features</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {features.map((feature) => {
                    const active = selectedFeatures.includes(feature);
                    return (
                      <button
                        key={feature}
                        type="button"
                        onClick={() =>
                          setSelectedFeatures((current) =>
                            current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]
                          )
                        }
                        className={`rounded-full px-3 py-2 text-sm transition ${
                          active
                            ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-200'
                            : 'bg-white/70 text-slate-700 dark:bg-slate-900/60 dark:text-slate-300'
                        }`}
                      >
                        {feature}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Style direction</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {styles.map((style) => {
                    const active = selectedStyle === style;
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                          active
                            ? 'bg-cyan-500/15 text-cyan-700 shadow-[0_12px_30px_rgba(34,211,238,0.16)] dark:text-cyan-200'
                            : 'bg-white/70 text-slate-700 hover:bg-white/90 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-900/80'
                        }`}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Custom style notes</label>
                <textarea
                  value={customStyleNotes}
                  onChange={(event) => setCustomStyleNotes(event.target.value)}
                  className="mt-2 min-h-[92px] w-full rounded-2xl border border-white/15 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none dark:bg-slate-900/60 dark:text-white"
                  placeholder="Add any extra style direction you want, like luxury serif, playful gradients, bold modern startup, cinematic dark, warm editorial, or anything else."
                />
              </div>

              <textarea
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="min-h-[92px] w-full rounded-2xl border border-white/15 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none dark:bg-slate-900/60 dark:text-white"
                placeholder="Who is the site for? What audience should the copy, layout, and CTA target?"
              />
              <textarea
                value={goals}
                onChange={(event) => setGoals(event.target.value)}
                className="min-h-[92px] w-full rounded-2xl border border-white/15 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none dark:bg-slate-900/60 dark:text-white"
                placeholder="What should the website achieve? Leads, signups, purchases, booking calls, newsletter growth, etc."
              />
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-white/15 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none dark:bg-slate-900/60 dark:text-white"
                placeholder="Any extra notes, brand references, page ideas, or things the AI should add automatically?"
              />

              <button
                type="submit"
                disabled={working}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white disabled:opacity-70"
              >
                <Sparkles className="h-4 w-4" />
                {working ? 'Building prompt...' : 'Generate prompt draft'}
              </button>
            </form>
          </GlassPanel>

          <GlassPanel className="flex min-h-0 flex-col rounded-3xl p-5">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Prompt chat</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                This space is only for crafting the prompt. No code, no preview, just AI helping you build a stronger brief.
              </p>
            </div>

            <div className="grid min-h-0 flex-1 gap-4 lg:grid-rows-[1fr_auto_auto]">
              <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
                {messages.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-white/20 bg-white/55 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/50 dark:text-slate-200">
                    Fill out the form on the left and Prompt Lab will generate a deeper, more useful website prompt for you.
                  </div>
                ) : null}

                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] whitespace-pre-wrap rounded-[1.5rem] px-4 py-3 text-sm ${
                        message.role === 'user'
                          ? 'rounded-br-md bg-cyan-500/12 text-slate-900 dark:text-white'
                          : 'rounded-bl-md border border-white/20 bg-white/55 text-slate-800 dark:bg-slate-900/50 dark:text-slate-100'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/60 p-4 dark:bg-slate-900/55">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Current prompt draft</p>
                <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-800 dark:text-slate-100">{promptDraft || 'No prompt draft yet.'}</pre>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/70 p-3 dark:bg-slate-900/60">
                <textarea
                  value={refinement}
                  onChange={(event) => setRefinement(event.target.value)}
                  className="min-h-[96px] w-full resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none dark:text-white"
                  placeholder="Tell Prompt Lab how to improve the prompt it made..."
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => void refinePrompt()}
                    disabled={working || !promptDraft}
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white disabled:opacity-70"
                  >
                    {working ? 'Thinking...' : 'Refine prompt'}
                  </button>
                </div>
              </div>
            </div>
          </GlassPanel>
        </section>
      </>
    </AppShell>
  );
}
