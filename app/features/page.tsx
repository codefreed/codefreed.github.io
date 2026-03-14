import Link from 'next/link';
import { Bot, FileCode2, MonitorSmartphone, Rocket, UploadCloud, Wand2 } from 'lucide-react';

const features = [
  {
    title: 'AI Website Generation',
    copy: 'Start from a prompt and generate real files for a website instead of just static mockups.',
    icon: Wand2
  },
  {
    title: 'Conversational Editing',
    copy: 'Refine the project through chat, request revisions, and keep iterating on a live draft.',
    icon: Bot
  },
  {
    title: 'Preview and IDE Modes',
    copy: 'Switch between preview-first editing and a more code-focused IDE workflow when you need it.',
    icon: MonitorSmartphone
  },
  {
    title: 'Project Files',
    copy: 'Work with actual project files, exports, and versioned changes as the site evolves.',
    icon: FileCode2
  },
  {
    title: 'Reference Uploads',
    copy: 'Attach files for extra AI context when you want the builder to follow existing patterns or content.',
    icon: UploadCloud
  },
  {
    title: 'Deployment Path',
    copy: 'Export your project or move toward deployment with a workflow built around getting sites live.',
    icon: Rocket
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Features</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Everything in CodeFreed is built around making AI website creation simpler, faster, and more usable.
            </p>
          </div>
          <Link href="/" className="text-sm text-cyan-600 dark:text-cyan-300">
            Back to home
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="glass rounded-3xl p-6">
              <feature.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
