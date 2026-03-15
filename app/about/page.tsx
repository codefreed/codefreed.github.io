import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

const sections = [
  {
    title: 'What CodeFreed is',
    body: [
      'CodeFreed is a free AI website builder. You describe what you want, and it generates a real, working site — not a mockup, not a template with placeholder text, actual code you can edit and ship.',
      'The idea behind it is simple: the hardest part of starting a website isn\'t the building, it\'s the blank page. CodeFreed gets you past that in minutes.'
    ]
  },
  {
    title: 'Who it\'s for',
    body: [
      'People launching something and needing a site fast.',
      'Developers who want a solid starting point instead of building from scratch.',
      'Founders validating an idea before committing to a full build.',
      'Anyone who\'s been putting off making a site because it felt like too much work.'
    ]
  },
  {
    title: 'What we\'re trying to do',
    body: [
      'Making a website shouldn\'t require expensive tools, a design background, or a week of setup.',
      'We built CodeFreed because we wanted something that gets out of your way and lets you focus on what you\'re actually building — not on configuring it.'
    ]
  },
  {
    title: 'How it works',
    body: [
      'Start with a prompt describing your site.',
      'The AI generates the pages, layout, and files.',
      'Preview it live, refine it through chat, edit the code directly if you want.',
      'Export or deploy when you\'re happy with it.'
    ]
  },
  {
    title: 'Still early',
    body: [
      'CodeFreed is actively being built. Things will change, and we\'ll keep improving it as more people use it and give us feedback.'
    ]
  },
  {
    title: 'Say hi',
    body: ['If you have feedback, questions, or ran into something broken, head to the Contact page. We actually read it.']
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <MarketingHeader />
        </div>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">About CodeFreed</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              A free AI website builder made for people who want to go from idea to live site without the usual friction.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="glass rounded-3xl p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <MarketingFooter />
        </div>
      </section>
    </main>
  );
}
