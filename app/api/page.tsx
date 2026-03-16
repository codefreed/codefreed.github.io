import type { Metadata } from 'next';
import { Bot, Database, KeyRound, ShieldCheck, Wand2 } from 'lucide-react';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'API and Integrations | CodeFreed',
  description: 'Learn how CodeFreed uses AI providers and how users can bring their own Firebase keys into generated websites.',
  path: '/api'
});

const apiSections = [
  {
    title: 'AI Website Generation',
    icon: Bot,
    body: [
      'CodeFreed uses OpenAI-powered chat and generation workflows to help turn prompts into website files.',
      'Inside the builder, you can describe a page, request edits, upload reference files, and let the AI generate or update the project structure.',
      'The experience is designed to feel conversational while still producing real files you can preview, export, and continue editing.'
    ]
  },
  {
    title: 'How ChatGPT Fits In',
    icon: Wand2,
    body: [
      'The CodeFreed builder uses ChatGPT-style AI generation through the platform API layer.',
      'That means prompts can be used for layout ideas, landing page copy, component updates, visual changes, and multi-file edits across a website project.',
      'The goal is not just answering questions, but helping users actually build and revise working website files.'
    ]
  },
  {
    title: 'Bring Your Own Firebase Keys',
    icon: KeyRound,
    body: [
      'CodeFreed also supports custom Firebase configuration for the websites you generate.',
      'If you want your generated project to use your own Firebase setup, you can input your own Firebase web config keys and save them for use in generated sites.',
      'This makes it easier to connect your own authentication, Firestore, storage, and project infrastructure instead of relying on a shared configuration.'
    ]
  },
  {
    title: 'Firebase in Generated Projects',
    icon: Database,
    body: [
      'Your generated website can be configured to work with your own Firebase project details such as API key, auth domain, project ID, storage bucket, messaging sender ID, and app ID.',
      'This is useful for creators who want their generated website to connect to their own backend services and data.',
      'The builder includes a Firebase setup flow to help validate and save this information.'
    ]
  },
  {
    title: 'Security and Control',
    icon: ShieldCheck,
    body: [
      'API-backed features are meant to support real website generation while still leaving users in control of their files and deployment choices.',
      'CodeFreed is built so users can preview projects, export files, connect their own services, and choose how they want to launch their site.'
    ]
  }
];

export default function ApiPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">API and Integrations</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Learn how CodeFreed uses ChatGPT-style AI generation and how you can bring your own Firebase keys into
              the websites you build.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {apiSections.map((section) => (
            <article key={section.title} className="glass rounded-3xl p-6 md:p-7">
              <section.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <MarketingFooter />
      </section>
    </main>
  );
}
