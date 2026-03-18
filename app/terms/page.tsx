import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata, SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service | CodeFreed',
  description: 'Read the CodeFreed terms of service for rules, AI-generated content responsibilities, liability, and service usage.',
  path: '/terms'
});

const sections = [
  {
    title: '1. Use of the Service',
    body: [
      'CodeFreed provides tools that allow users to generate websites and code using artificial intelligence.',
      'You agree to use the service only for lawful purposes and in accordance with these Terms.',
      'You may not use the service to create illegal or harmful content, violate laws or regulations, infringe on intellectual property rights, or attempt to disrupt or damage the service.',
      'We reserve the right to suspend or restrict access to users who violate these rules.'
    ]
  },
  {
    title: '2. AI-Generated Content',
    body: [
      'CodeFreed uses artificial intelligence to generate code and website content.',
      'We do not guarantee that generated content will be accurate, complete, or suitable for any specific purpose.',
      'Users are responsible for reviewing and verifying any generated code or content before using it.',
      'CodeFreed is not liable for any damages resulting from the use of AI-generated content.'
    ]
  },
  {
    title: '3. User Responsibility',
    body: [
      'Users are responsible for how they use the content created with CodeFreed.',
      'This includes ensuring generated websites comply with laws, making sure content does not infringe copyrights, and verifying code security before deployment.'
    ]
  },
  {
    title: '4. Intellectual Property',
    body: [
      'The CodeFreed website, tools, branding, and software are owned by CodeFreed unless otherwise stated.',
      'Users retain ownership of the content they generate using the platform, but CodeFreed may temporarily process that content to provide the service.'
    ]
  },
  {
    title: '5. Service Availability',
    body: [
      'We aim to keep CodeFreed available at all times, but we do not guarantee uninterrupted access.',
      'The service may be modified, updated, or discontinued at any time without notice.'
    ]
  },
  {
    title: '6. Third-Party Services',
    body: [
      'CodeFreed may link to or integrate with third-party services.',
      'We are not responsible for the content or policies of those external websites.'
    ]
  },
  {
    title: '7. Limitation of Liability',
    body: [
      'CodeFreed is provided “as is” without warranties of any kind.',
      'We are not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of our website or services.'
    ]
  },
  {
    title: '8. Changes to These Terms',
    body: [
      'We may update these Terms of Service at any time.',
      'Changes will be posted on this page with the updated date.',
      'Continued use of the website after changes means you accept the updated Terms.'
    ]
  },
  {
    title: '9. Contact',
    body: ['If you have any questions about these Terms, please contact us through the website.']
  }
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <MarketingHeader />
        </div>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Terms of Service</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Last Updated: March 14, 2026. By accessing or using CodeFreed at {SITE_URL}, you agree to these terms.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-[1600px] space-y-6">
          <section className="glass rounded-3xl p-6 md:p-7">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Agreement</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              <p>Welcome to CodeFreed. By accessing or using our website, you agree to comply with and be bound by these Terms of Service.</p>
              <p>If you do not agree with these terms, please do not use our website.</p>
              <p>By using CodeFreed, you agree to these Terms of Service.</p>
            </div>
          </section>

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
        <div className="mx-auto mt-10 w-full max-w-[1600px]">
          <MarketingFooter />
        </div>
      </section>
    </main>
  );
}
