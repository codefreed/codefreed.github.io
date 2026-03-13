import { NextResponse } from 'next/server';
import { z } from 'zod';

const DeployGuideSchema = z.object({
  repositoryUrl: z.string().url(),
  projectName: z.string().min(1).max(100).optional()
});

const REQUIRED_ENV_KEYS = [
  'OPENAI_API_KEY',
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

export async function POST(req: Request) {
  try {
    const parsed = DeployGuideSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid repository URL' }, { status: 400 });
    }

    const repoUrl = parsed.data.repositoryUrl.trim();
    const projectName = parsed.data.projectName?.trim();

    const allowedHosts = ['github.com', 'gitlab.com', 'bitbucket.org'];
    const host = new URL(repoUrl).hostname.toLowerCase();
    if (!allowedHosts.includes(host)) {
      return NextResponse.json(
        { error: 'Repository URL must be from github.com, gitlab.com, or bitbucket.org' },
        { status: 400 }
      );
    }

    const params = new URLSearchParams();
    params.set('repository-url', repoUrl);
    params.set('env', REQUIRED_ENV_KEYS.join(','));
    if (projectName) {
      params.set('project-name', projectName);
    }

    const deployUrl = `https://vercel.com/new/clone?${params.toString()}`;

    return NextResponse.json({
      deployUrl,
      requiredEnvKeys: REQUIRED_ENV_KEYS
    });
  } catch {
    return NextResponse.json({ error: 'Could not generate deploy URL' }, { status: 500 });
  }
}
