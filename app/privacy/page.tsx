import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy | CodeFreed',
  description: 'Read the CodeFreed privacy policy covering cookies, advertising, data collection, and contact details.',
  path: '/privacy'
});

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'When you use CodeFreed, we may collect certain types of information, including:',
      'Personal Information',
      'We may collect personal information that you voluntarily provide, such as:',
      'Email address (if you contact us)',
      'Account information (if accounts are added in the future)',
      'Automatically Collected Information',
      'When you visit the website, certain information may be collected automatically, including:',
      'IP address',
      'Browser type',
      'Device type',
      'Pages visited',
      'Time spent on pages',
      'Referring website',
      'This information helps us improve our services and understand how visitors use the site.'
    ]
  },
  {
    title: '2. Cookies and Tracking Technologies',
    body: [
      'CodeFreed may use cookies and similar technologies to:',
      'Remember user preferences',
      'Improve website performance',
      'Analyze traffic',
      'Display advertisements',
      'Cookies are small files stored on your device. You can disable cookies in your browser settings if you prefer.'
    ]
  },
  {
    title: '3. Advertising',
    body: [
      'We may use third-party advertising services, including Google through Google AdSense, to display ads.',
      'These services may use cookies, web beacons, or similar technologies to show relevant advertisements based on your visits to this and other websites.'
    ]
  },
  {
    title: '4. Third-Party Services',
    body: [
      'CodeFreed may use third-party services such as:',
      'Analytics tools',
      'Advertising networks',
      'Hosting services',
      'These services may collect information according to their own privacy policies.'
    ]
  },
  {
    title: "5. Children's Information",
    body: [
      'CodeFreed does not knowingly collect personal information from children under the age of 13.',
      'If you believe that a child has provided personal information on our website, please contact us so we can remove the information promptly.'
    ]
  },
  {
    title: '6. Data Security',
    body: [
      'We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or electronic storage is completely secure.'
    ]
  },
  {
    title: '7. Changes to This Privacy Policy',
    body: ['We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.']
  },
  {
    title: '8. Contact Us',
    body: ['If you have any questions about this Privacy Policy, you can contact us:', 'Website: CodeFreed', 'Contact Page: /contact']
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <MarketingHeader />
        </div>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Privacy Policy</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Last Updated: March 14, 2026. This policy explains how we collect, use, and protect your information when you visit CodeFreed.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl space-y-6">
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

          <section className="glass rounded-3xl p-6 md:p-7">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Google Advertising Information</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              <p>
                Learn more about how Google uses data:{' '}
                <a className="text-cyan-600 dark:text-cyan-300" href="https://policies.google.com/technologies/ads">
                  policies.google.com/technologies/ads
                </a>
              </p>
              <p>
                You can opt out of personalized advertising at:{' '}
                <a className="text-cyan-600 dark:text-cyan-300" href="https://adssettings.google.com/">
                  adssettings.google.com
                </a>
              </p>
            </div>
          </section>
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <MarketingFooter />
        </div>
      </section>
    </main>
  );
}
