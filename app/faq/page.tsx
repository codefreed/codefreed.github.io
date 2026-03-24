import Link from 'next/link';
import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'FAQ | CodeFreed',
  description: 'Get answers about CodeFreed pricing, privacy, exports, frameworks, AI models, and how the website builder works.',
  path: '/faq'
});

const faqs = [
  {
    question: 'What actually is CodeFreed?',
    answer:
      'CodeFreed is a free AI website builder that helps people turn plain-English descriptions into real, working websites. You describe what you want — the type of site, the product it represents, the sections you need — and the builder generates a complete draft with actual files and a live preview. From there, you can keep refining the same project through chat, make manual edits in the code editor, and deploy or export when it looks right. The whole workflow is designed around iteration rather than a single one-shot generation.'
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No. If you can describe what you want in plain language, you can build with CodeFreed. The AI handles the structure, layout, and code so you can focus on the content and design direction. If you do know how to code, the builder still gives you IDE-style editing, visible file structure, and full export capability so you can step in manually whenever you want more control. Most experienced developers use a combination of both — AI for the rough work, manual editing for the precise finishing touches.'
  },
  {
    question: 'Can I export my project?',
    answer:
      'Yes. You can export the full project as a zip file at any point during development. The export contains the actual source files — not a compiled or obfuscated bundle — so you can open them in any code editor, deploy them with your own hosting infrastructure, or hand the project to a developer for further work. There are no proprietary formats and no restrictions on what you do with the exported files. The project you build in CodeFreed is yours to keep and use however you want.'
  },
  {
    question: 'Can I see the site before publishing?',
    answer:
      'Yes. The live preview panel is built into the editor and stays open beside the chat interface so you can see your changes in real time as you make them. You do not need to leave the workspace, open a separate browser tab, or trigger a build to check what the page looks like. That side-by-side layout makes it easier to compare what you asked for with what was actually generated, and to spot layout or messaging issues before the site goes live.'
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. CodeFreed is completely free to use right now, with no credit card required and no time-limited trial. You can build full projects, use the live preview, export files, and access all the AI generation features without entering payment information at any stage. The goal is to let people build and evaluate the workflow before any future pricing conversation exists. If paid plans are introduced later, that will be communicated clearly in advance, and we expect the core builder experience to remain accessible.'
  },
  {
    question: 'Which AI models does it use?',
    answer:
      'You can pick from GPT-4.1, GPT-5, and Gemini right inside the builder using the model selector. The option exists because different tasks sometimes benefit from different models — some requests get better results from a faster model optimized for structured output, while others benefit from a more capable model that handles nuanced copy or complex layout requests. You can switch models mid-project without losing your work, so you are not locked into one provider for the entire session.'
  },
  {
    question: 'What frameworks or project styles does CodeFreed support?',
    answer:
      'CodeFreed is currently centered on website generation and frontend project structures that fit the builder preview and export flow. It is especially well-suited for landing pages, marketing sites, portfolio layouts, and early frontend shells that can be refined over multiple passes. The generated projects use standard web technologies — HTML, CSS, and JavaScript — in formats that any modern developer can work with. More complex application frameworks and backend-heavy architectures are outside the primary scope of the tool.'
  },
  {
    question: 'Can I bring my own Firebase configuration?',
    answer:
      'Yes. The app includes a Firebase setup flow so you can add your own web configuration keys for generated projects. That is useful if you want the site you build to connect to your own Firebase authentication, Firestore database, or storage bucket instead of relying on a shared default. The setup wizard walks you through the configuration step by step and validates the connection before saving. This is most relevant for projects that need real user accounts, form submission storage, or file uploads.'
  },
  {
    question: 'How does CodeFreed handle privacy and user data?',
    answer:
      'CodeFreed includes a public privacy policy and trust pages that explain how site data is handled, including cookies, session information, and any advertising disclosures. The product uses standard web security practices and does not sell user data to third parties. As with any AI workflow that sends text to a language model, users should avoid including sensitive personal information like passwords, financial data, or private identification numbers in their prompts. The full privacy policy is available at the link in the site footer.'
  },
  {
    question: 'Can I use CodeFreed on a custom domain?',
    answer:
      'Yes. Once you export or deploy your project, you can connect it to any custom domain through your hosting provider. If you deploy to Vercel, domain configuration is handled directly in the Vercel dashboard and takes only a few minutes. Using a real custom domain rather than a temporary preview subdomain is strongly recommended for any site that will receive real visitors — it significantly improves the credibility of the site, helps with branding, and is a requirement for things like Google AdSense approval and professional email addresses.'
  },
  {
    question: 'Does CodeFreed replace a developer?',
    answer:
      'No, and that is intentional. CodeFreed is best understood as a speed tool that gets you to a strong starting point much faster than building from scratch, not as a replacement for development expertise. Developers still add significant value by reviewing code quality, validating integrations, handling edge cases, ensuring accessibility, and making the kinds of structural decisions that benefit from experience. The ideal use of CodeFreed is to get the first working version in front of people quickly, then bring in development resources when the project has proven itself and has the scope to justify it.'
  },
  {
    question: 'What should I review before deploying an AI-generated site?',
    answer:
      'Before deploying, check the copy for accuracy — replace any placeholder text the AI left in and make sure all product descriptions, pricing, and feature claims are correct. Review all links and buttons to confirm they go somewhere real. Check how the page looks on narrow mobile screens, since many visitors will arrive on phones and responsive behavior is worth validating manually. Confirm that any forms have a working destination. Review legal pages to make sure a privacy policy and contact information are present, especially if you are collecting email addresses or running advertising. A human review pass before launch catches the gaps that automated generation tends to leave.'
  },
  {
    question: 'Can I use CodeFreed for advertising or content sites?',
    answer:
      'Yes, but getting a site approved for advertising networks like Google AdSense requires more than a generated draft. Ad reviewers look for genuine original content, a clear purpose, proper contact information, legal pages, and enough substance to demonstrate that the site offers real value to human visitors. A site that consists primarily of AI-generated promotional copy with no actual depth or original perspective is unlikely to pass review. To build a site that qualifies for advertising, you need to add real blog content, expand every page beyond its initial generated version, and make sure the site reads as a legitimate publishing property rather than a thin product shell.'
  },
  {
    question: 'How do I get better results from the AI?',
    answer:
      'The most effective way to improve AI output quality is to write more specific prompts. Instead of "make me a landing page," describe the product, the target audience, the core value proposition, the sections you want, and the visual tone. The more context the AI has, the less it has to guess. Reference file uploads also help significantly — if you upload a design file, brand document, or competitor page, the AI uses it as context for all edits in that session. If the first draft is not quite right, use the chat to make targeted corrections rather than trying to fix everything at once.'
  },
  {
    question: 'Is there a limit to how many projects I can build?',
    answer:
      'Currently, there are no strict limits on the number of projects you can create in CodeFreed while it is free. You can start new projects, work on multiple sites, and maintain different versions without hitting a hard cap on project count. As the product evolves and usage-based pricing may eventually be introduced, any limits that affect project counts will be clearly communicated before they take effect. For now, build as much as you need to.'
  },
  {
    question: 'Can I collaborate with someone else on a project?',
    answer:
      'Team collaboration features are on the roadmap but are not available in the current version of CodeFreed. Right now, the tool is designed for individual use or for a small team where one person manages the builder and shares exports with others. The most practical workaround for collaborative projects is to use the export function to share project files with teammates, make edits collaboratively outside the builder, and then re-import or continue building in parallel. Native real-time collaboration is something we plan to add in a future update.'
  }
];

export default function FaqPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-[1600px]">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Questions we get a lot</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Straight answers about how CodeFreed works — pricing, exports, AI models, and everything else people ask before they start building.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="glass rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 glass rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Still have questions?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            If your question is not covered here, the best place to ask is the Contact page. We read every message and usually respond within a day or two.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Contact us →
            </Link>
            <Link
              href="/blog"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Read the blog →
            </Link>
            <Link
              href="/app"
              className="inline-flex h-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Try the builder free →
            </Link>
          </div>
        </div>

        <MarketingFooter />
      </section>
    </main>
  );
}
