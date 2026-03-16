import { getFirebaseAdmin } from '@/lib/firebase/admin';

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  category: string;
  sections: BlogSection[];
  source: 'editorial' | 'community';
};

export type BlogSubmissionStatus = 'pending' | 'approved' | 'rejected';

export type BlogSubmission = {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  email: string;
  category: string;
  content: string;
  status: BlogSubmissionStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  reviewNotes: string;
  flaggedReasons: string[];
};

const BLOG_COLLECTION = 'blogSubmissions';
const SPAM_PATTERNS = [
  /casino/i,
  /crypto giveaway/i,
  /loan approval/i,
  /adult/i,
  /viagra/i,
  /seo package/i
];

export const editorialBlogPosts: BlogPost[] = [
  {
    slug: 'how-ai-website-builders-help-you-launch-faster',
    title: 'How AI Website Builders Help Small Teams Launch Faster',
    description:
      'A practical look at how AI website builders shorten the path from idea to launch for founders, freelancers, and small product teams.',
    author: 'Teddy Brown',
    publishedAt: '2026-03-14',
    category: 'AI Website Builders',
    source: 'editorial',
    sections: [
      {
        heading: 'The biggest slowdown is usually not coding',
        paragraphs: [
          'Most small teams do not get stuck because they are incapable of writing HTML, CSS, or React. They get stuck because the path from blank page to a clear, working first draft takes too long. Someone has to define the structure, someone has to choose the sections, someone has to write starter copy, and someone has to turn all of that into a layout that does not feel generic. That coordination cost is what slows launches down long before technical skill becomes the main issue.',
          'AI website builders help by compressing that early decision-making stage. Instead of spending several days deciding what the hero should say, which sections belong on the page, and how to arrange the flow, a team can prompt for a first version and react to something concrete. That matters because it is much easier to improve an imperfect draft than it is to debate a blank screen.'
        ]
      },
      {
        heading: 'A first draft changes the conversation',
        paragraphs: [
          'The moment an AI builder produces a functioning homepage, the project shifts from abstract planning to active editing. Founders can point to the pricing section and say it needs to feel more premium. A designer can ask for a lighter tone, softer spacing, or stronger hierarchy. A developer can quickly spot what should be rewritten by hand and what is already good enough to keep. Everyone is suddenly reacting to the same artifact instead of imagining different versions in their head.',
          'That shared context is a big reason AI builders save time. They do not remove the need for judgment. They remove the long delay before judgment becomes useful. When a team can see the site, preview it, and revise it immediately, it becomes far easier to move from rough concept to shipping decisions.'
        ]
      },
      {
        heading: 'The best workflows stay iterative',
        paragraphs: [
          'One of the weaknesses of some AI products is that they treat generation like a one-time event. You type a prompt, receive a result, and then you are left to start over if the output is not quite right. That is not how real website work happens. Real web projects usually need a cycle of review, revision, and refinement where each pass gets more specific.',
          'An effective AI website builder should support that longer loop. You should be able to say that the headline is too aggressive, the features section needs proof points, or the footer needs trust links, and then continue from the existing project instead of resetting everything. That iterative flow is what turns AI from a novelty into a practical production tool.'
        ]
      },
      {
        heading: 'Speed matters most when teams are testing ideas',
        paragraphs: [
          'A startup validating a product idea often needs to publish quickly, learn from traffic, and change direction without treating each website revision like a full redesign project. The same is true for consultants creating campaign pages, indie makers launching waitlists, or agencies prototyping concepts for clients. In all of those cases, the goal is not just to build a page. The goal is to reduce the cost of trying something new.',
          'AI builders are especially valuable in that environment because they make experimentation cheaper. A team can try a bolder offer, a different information structure, or a more niche audience angle with far less overhead. If the change does not work, the loss is measured in minutes instead of a week of production time.'
        ]
      },
      {
        heading: 'You still need ownership and control',
        paragraphs: [
          'Launching faster is only useful if the result is something your team can actually own. That is why export options, editable files, and clear project structure matter so much. If a builder hides everything behind a locked interface, it creates a new problem after solving the old one. Teams need to know they can keep the code, move it somewhere else, or hand it off to a developer when the project grows up.',
          'The healthiest AI workflows keep the speed while preserving control. You should be able to use AI for the heavy lifting, then step in manually when something needs a human touch. That blend is often more realistic than the promise of fully automated website creation.'
        ]
      },
      {
        heading: 'What to look for in a serious AI builder',
        paragraphs: [
          'If your goal is to launch faster, look for an AI website builder that supports long prompts, multiple rounds of revision, file exports, and model choice. Those features sound small, but they make a large difference in practice. Long prompts let you explain brand tone and structure. Revision support keeps momentum after the first draft. Exports prevent lock-in. Model choice gives you flexibility when one provider is better at speed and another is better at complex edits.',
          'The broader lesson is simple: AI builders are most useful when they behave like a workspace, not a gimmick. When they help a small team move from idea to testable website with less friction, they become an unfair speed advantage. That is where the real value shows up.'
        ]
      }
    ]
  },
  {
    slug: 'what-no-code-tools-are-good-at-and-where-they-still-need-help',
    title: 'What No-Code Tools Are Good At and Where They Still Need Help',
    description:
      'A balanced guide to the strengths and limitations of modern no-code tools for websites, landing pages, and product experiments.',
    author: 'Teddy Brown',
    publishedAt: '2026-03-12',
    category: 'No-Code Tools',
    source: 'editorial',
    sections: [
      {
        heading: 'No-code tools have become much more practical',
        paragraphs: [
          'The old stereotype about no-code products was that they were toys. They looked impressive in demos but broke down as soon as you wanted something custom. That picture is outdated. Modern no-code tools are genuinely useful for launching marketing sites, internal dashboards, forms, content hubs, and early product workflows. They can remove a surprising amount of repetitive setup work and help non-developers participate more directly in building on the web.',
          'What changed is not just design quality. The better tools now think in terms of systems instead of templates. They understand collections, components, reusable sections, integrations, and publishing workflows. That means a founder or marketer can get much closer to a production-ready result than they could a few years ago.'
        ]
      },
      {
        heading: 'They shine when the task is mostly structure and presentation',
        paragraphs: [
          'No-code tools are strongest when the project can be broken into pages, sections, content, and light interactions. A landing page, a documentation center, a portfolio, or a lead capture funnel all fit that pattern. These are the kinds of jobs where consistency, speed, and visual polish matter more than unusual application logic.',
          'That is why no-code and AI-assisted builders have become so appealing for web publishing. They reduce the amount of manual assembly work needed to get a clean, responsive site online. Instead of wiring every piece by hand, users can focus on message, hierarchy, and calls to action.'
        ]
      },
      {
        heading: 'Where no-code starts to struggle',
        paragraphs: [
          'The friction usually appears when a project needs more custom behavior than the product was designed to expose. Complex state, unusual business rules, highly tailored animations, or fine-grained app logic can push no-code interfaces past their comfort zone. At that point, the visual builder starts to feel like a maze of workarounds instead of a productivity boost.',
          'This is also where users begin to care more about export quality and code access. Even if a no-code tool gets you eighty percent of the way there, the last twenty percent can matter a lot. If you cannot inspect what was generated or move it into a more flexible environment, the final stretch becomes frustrating.'
        ]
      },
      {
        heading: 'AI adds speed, but it does not replace judgment',
        paragraphs: [
          'The current generation of AI-assisted no-code tools solves one of the biggest historical weaknesses: getting started. Instead of manually assembling every section, users can now describe a website and receive a structured draft almost immediately. That gives no-code platforms a stronger entry point than ever before.',
          'Still, the same human questions remain. Is the information architecture correct for the audience? Does the messaging earn trust? Is the generated UI too generic? AI can accelerate output, but someone still has to decide what good looks like. The best tools acknowledge that by making editing and iteration easy rather than pretending the first result is always final.'
        ]
      },
      {
        heading: 'The healthiest setup is often hybrid',
        paragraphs: [
          'A hybrid approach usually works best for serious projects. Use no-code or AI tools to move quickly through the initial build, then hand-edit the areas that need precision. That could mean exporting the project, refining styles in code, or connecting the frontend to your own backend services. The fast start and the technical control do not have to be opposites.',
          'This is one reason builders that include export tools, IDE-style editing, or clear file structure feel more durable. They let a project graduate from easy mode to advanced mode without forcing a rewrite. For teams that want speed now and flexibility later, that matters a lot.'
        ]
      },
      {
        heading: 'A realistic way to evaluate no-code',
        paragraphs: [
          'The right question is not whether no-code can do everything. Very few tools can. The better question is whether it removes enough friction from the part of the job you do most often. If your main need is launching pages, testing ideas, and updating web content fast, then a strong no-code or AI-assisted builder can save a meaningful amount of time.',
          'In that sense, no-code tools are best viewed as leverage. They are excellent at turning clear intent into usable structure quickly. When paired with good taste, clear goals, and a way to extend the result later, they can be one of the smartest ways to build on the web.'
        ]
      }
    ]
  },
  {
    slug: 'web-development-tips-for-turning-ai-generated-sites-into-real-projects',
    title: 'Web Development Tips for Turning AI-Generated Sites into Real Projects',
    description:
      'Practical web development advice for cleaning up, validating, and shipping websites that started as AI-generated drafts.',
    author: 'Teddy Brown',
    publishedAt: '2026-03-10',
    category: 'Web Development Tips',
    source: 'editorial',
    sections: [
      {
        heading: 'Treat AI output like a first draft, not a final asset',
        paragraphs: [
          'A common mistake is assuming that because an AI-generated site looks complete, it is ready for production as-is. In reality, the first output should be treated the same way you would treat a quick prototype from a teammate. It might be structurally useful, visually promising, and directionally correct, but it still deserves review before it goes live.',
          'That mindset keeps expectations healthy. Instead of asking whether the AI got everything perfect, ask whether it gave you a strong starting point. If the answer is yes, you are already ahead. From there, your job is to tighten the copy, check the code paths, validate responsive behavior, and make sure the site reflects your actual brand.'
        ]
      },
      {
        heading: 'Start with content hierarchy and trust signals',
        paragraphs: [
          'One of the fastest ways to improve an AI-generated page is to review the content order. Does the headline make a clear promise? Are the supporting sections in a logical sequence? Does the page build trust before it asks for action? AI is often good at producing the parts of a website, but it may still need help arranging those parts into a persuasive flow.',
          'Trust signals are especially important if the site will be used for advertising or lead generation. Make sure there are accessible contact details, a privacy policy, terms, and enough real explanatory content for a human reviewer to understand what the site actually does. Those pieces can seem boring, but they make a large difference in credibility.'
        ]
      },
      {
        heading: 'Normalize the structure before you scale it',
        paragraphs: [
          'If the AI generated a messy mix of components, naming patterns, or page sections, clean that up early. Consistent file names, reusable layout sections, and clear component boundaries make future edits much easier. It is tempting to keep generating more and more pages immediately, but that can multiply a shaky structure into a bigger maintenance problem.',
          'A small amount of cleanup creates leverage. Once the first few sections are predictable and well named, future edits become safer and faster. This is especially useful if multiple people are going to touch the project later.'
        ]
      },
      {
        heading: 'Check responsiveness and interaction details manually',
        paragraphs: [
          'AI can produce responsive-looking code, but responsive-looking and truly polished are not always the same thing. Open the site on narrow widths, tablet widths, and large desktop views. Watch for overflow, cramped spacing, oversized headings, and buttons that feel awkward on touch screens. Those issues often show up only after a human actually tests the layout.',
          'The same goes for interactions. Hover states, focus states, keyboard navigation, and form behavior deserve attention. These are the details that help a generated website feel intentional instead of merely assembled.'
        ]
      },
      {
        heading: 'Validate integrations before promising functionality',
        paragraphs: [
          'If a generated project includes forms, Firebase configuration, analytics hooks, or deployment helpers, validate each integration independently. It is easy for placeholder logic to look finished when the UI is polished. Before launch, confirm where form submissions go, whether environment variables are required, and what happens when the user performs the main action the page is asking for.',
          'This is particularly important when using AI-generated code with third-party services. A beautiful interface with unverified integrations creates the illusion of readiness. A quick technical review protects you from shipping something that only works in the happy-path demo.'
        ]
      },
      {
        heading: 'Keep the useful speed, add the human finish',
        paragraphs: [
          'The smartest way to use AI in web development is not to fight the speed it provides. Let it handle first drafts, repetitive section builds, and rough copy. Then apply human judgment where it counts most: message clarity, brand tone, edge-case behavior, accessibility, and deployment readiness. That combination gives you the best of both worlds.',
          'AI-generated sites become real projects when someone takes ownership of the final quality. If you use the draft as leverage instead of as unquestioned truth, you can launch faster without lowering standards. That is where AI becomes genuinely useful in a professional workflow.'
        ]
      }
    ]
  }
];

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function buildSubmissionFlags(content: string, description: string) {
  const flags: string[] = [];

  if (wordCount(content) < 500) {
    flags.push('Article body is under 500 words.');
  }

  if (description.trim().length < 80) {
    flags.push('Summary is too short.');
  }

  if (SPAM_PATTERNS.some((pattern) => pattern.test(content) || pattern.test(description))) {
    flags.push('Possible spam or prohibited advertising language detected.');
  }

  return flags;
}

export function slugifyBlogTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70);
}

export function parseArticleContent(content: string): BlogSection[] {
  const lines = content.split(/\r?\n/);
  const sections: BlogSection[] = [];
  let currentHeading = 'Article';
  let currentParagraphs: string[] = [];
  let currentBuffer: string[] = [];

  const flushParagraph = () => {
    const paragraph = currentBuffer.join(' ').trim();
    if (paragraph) {
      currentParagraphs.push(paragraph);
    }
    currentBuffer = [];
  };

  const flushSection = () => {
    flushParagraph();
    if (currentParagraphs.length) {
      sections.push({
        heading: currentHeading,
        paragraphs: currentParagraphs
      });
    }
    currentParagraphs = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushSection();
      currentHeading = trimmed.replace(/^##\s+/, '').trim() || 'Article';
      continue;
    }

    currentBuffer.push(trimmed);
  }

  flushSection();

  return sections.length
    ? sections
    : [
        {
          heading: 'Article',
          paragraphs: content
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
            .filter(Boolean)
        }
      ];
}

function uniqueSlug(baseSlug: string, existingSlugs: Set<string>) {
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let attempt = 2;
  while (existingSlugs.has(`${baseSlug}-${attempt}`)) {
    attempt += 1;
  }

  return `${baseSlug}-${attempt}`;
}

function normalizeSubmissionRecord(id: string, data: Record<string, unknown>): BlogSubmission {
  return {
    id,
    slug: String(data.slug ?? ''),
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    author: String(data.author ?? ''),
    email: String(data.email ?? ''),
    category: String(data.category ?? 'Community'),
    content: String(data.content ?? ''),
    status: (data.status as BlogSubmissionStatus) ?? 'pending',
    createdAt: String(data.createdAt ?? new Date().toISOString()),
    updatedAt: String(data.updatedAt ?? new Date().toISOString()),
    publishedAt: data.publishedAt ? String(data.publishedAt) : null,
    reviewNotes: String(data.reviewNotes ?? ''),
    flaggedReasons: Array.isArray(data.flaggedReasons) ? data.flaggedReasons.map((value) => String(value)) : []
  };
}

export async function getBlogSubmissions(status?: BlogSubmissionStatus) {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return [] as BlogSubmission[];
  }

  const snapshot = await admin.db.collection(BLOG_COLLECTION).get();
  const submissions = snapshot.docs
    .map((doc) => normalizeSubmissionRecord(doc.id, doc.data() as Record<string, unknown>))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return status ? submissions.filter((item) => item.status === status) : submissions;
}

export async function getApprovedCommunityPosts(): Promise<BlogPost[]> {
  const submissions = await getBlogSubmissions('approved');

  return submissions.map((submission) => ({
    slug: submission.slug,
    title: submission.title,
    description: submission.description,
    author: submission.author,
    publishedAt: submission.publishedAt ?? submission.createdAt,
    category: submission.category,
    sections: parseArticleContent(submission.content),
    source: 'community'
  }));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const communityPosts = await getApprovedCommunityPosts();

  return [...editorialBlogPosts, ...communityPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPost(slug: string) {
  const editorial = editorialBlogPosts.find((post) => post.slug === slug);
  if (editorial) {
    return editorial;
  }

  const communityPosts = await getApprovedCommunityPosts();
  return communityPosts.find((post) => post.slug === slug) ?? null;
}

export async function createPendingSubmission(input: {
  title: string;
  description: string;
  author: string;
  email: string;
  category: string;
  content: string;
}) {
  const admin = getFirebaseAdmin();
  if (!admin) {
    throw new Error('Blog submissions require Firebase Admin credentials on the server.');
  }

  const now = new Date().toISOString();
  const existing = await getBlogSubmissions();
  const existingSlugs = new Set([...editorialBlogPosts.map((post) => post.slug), ...existing.map((post) => post.slug)]);
  const slug = uniqueSlug(slugifyBlogTitle(input.title), existingSlugs);
  const flaggedReasons = buildSubmissionFlags(input.content, input.description);

  const docRef = admin.db.collection(BLOG_COLLECTION).doc();
  const submission: Omit<BlogSubmission, 'id'> = {
    slug,
    title: input.title.trim(),
    description: input.description.trim(),
    author: input.author.trim(),
    email: input.email.trim(),
    category: input.category.trim(),
    content: input.content.trim(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    reviewNotes: '',
    flaggedReasons
  };

  await docRef.set(submission);

  return normalizeSubmissionRecord(docRef.id, submission as unknown as Record<string, unknown>);
}

export async function updateSubmissionStatus(
  id: string,
  input: { status: BlogSubmissionStatus; reviewNotes?: string }
) {
  const admin = getFirebaseAdmin();
  if (!admin) {
    throw new Error('Blog moderation requires Firebase Admin credentials on the server.');
  }

  const docRef = admin.db.collection(BLOG_COLLECTION).doc(id);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    throw new Error('Submission not found.');
  }

  const now = new Date().toISOString();
  const status = input.status;
  await docRef.set(
    {
      status,
      updatedAt: now,
      publishedAt: status === 'approved' ? now : null,
      reviewNotes: input.reviewNotes?.trim() ?? ''
    },
    { merge: true }
  );

  const next = await docRef.get();
  return normalizeSubmissionRecord(next.id, next.data() as Record<string, unknown>);
}
