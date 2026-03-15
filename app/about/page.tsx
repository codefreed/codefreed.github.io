import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

const sections = [
  {
    title: 'What CodeFreed Does',
    body: [
      'CodeFreed is a free AI-powered platform that helps people create websites quickly and easily.',
      'Our goal is to make website creation accessible to everyone, whether you are a beginner, student, developer, or entrepreneur.',
      'CodeFreed uses artificial intelligence to help generate websites, tools, and web projects without requiring advanced coding knowledge.'
    ]
  },
  {
    title: 'What You Can Do With CodeFreed',
    body: [
      'Generate websites using AI',
      'Build projects quickly',
      'Experiment with web development',
      'Launch ideas faster without complicated setup'
    ]
  },
  {
    title: 'Our Mission',
    body: [
      'Our mission is to make website creation free, simple, and accessible to anyone on the internet.',
      'We believe building things on the web should not require expensive software or advanced technical skills.',
      'By combining AI with easy-to-use tools, CodeFreed aims to remove barriers that prevent people from creating and sharing ideas online.'
    ]
  },
  {
    title: 'Who CodeFreed Is For',
    body: [
      'Students learning about technology',
      'Developers testing ideas',
      'Creators building online projects',
      'Anyone who wants to make a website quickly'
    ]
  },
  {
    title: 'Continuous Improvement',
    body: [
      'CodeFreed is constantly evolving as new features, tools, and improvements are added to make the platform more powerful and easier to use.'
    ]
  },
  {
    title: 'Contact',
    body: ['If you have questions, suggestions, or feedback about CodeFreed, please visit the Contact page on our website.']
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
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">About CodeFreed</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              CodeFreed is a free AI website generator built to help people create, test, and launch websites faster.
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
