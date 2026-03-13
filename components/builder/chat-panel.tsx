'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useBuilderStore } from '@/lib/store/builder-store';
import { saveChatMessage, saveVersion } from '@/lib/project-service';
import type { AiResponsePayload } from '@/lib/ai/schema';
import { IS_STATIC_EXPORT } from '@/lib/runtime';

const AI_TIMEOUT_MS = 285_000;
const AI_TIMEOUT_SECONDS = Math.round(AI_TIMEOUT_MS / 1000);
const WORKING_STEPS = [
  'Reviewing your request',
  'Scanning the current project files',
  'Planning the layout and interactions',
  'Writing the update'
];

function parseErrorMessage(text: string) {
  try {
    const parsed = JSON.parse(text) as { error?: string };
    return parsed.error || text;
  } catch {
    return text;
  }
}

async function runAi(params: { instruction: string; files: Record<string, string>; errorContext?: string }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(parseErrorMessage(text) || 'AI request failed');
    }

    return (await response.json()) as AiResponsePayload;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function ChatPanel({ projectId }: { projectId: string }) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [workingStep, setWorkingStep] = useState(0);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const { files, messages, versions, addUserMessage, applyAiResponse, rollbackVersion, setSaving, markSaved } =
    useBuilderStore();

  useEffect(() => {
    if (!busy) return;

    setWorkingStep(0);
    const intervalId = window.setInterval(() => {
      setWorkingStep((current) => (current < WORKING_STEPS.length - 1 ? current + 1 : current));
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, [busy]);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, busy, workingStep]);

  const send = async (overrideInstruction?: string, errorContext?: string) => {
    const instruction = (overrideInstruction ?? input).trim();
    if (!instruction) return;
    if (IS_STATIC_EXPORT) {
      toast.error('AI editing is unavailable on GitHub Pages. Deploy this app to Vercel to enable server-backed AI.');
      return;
    }

    try {
      setBusy(true);
      setSaving(true);
      const userMessageId = addUserMessage(instruction);
      void saveChatMessage(projectId, {
        id: userMessageId,
        role: 'user',
        content: instruction,
        createdAt: Date.now()
      }).catch(() => undefined);

      const ai = await runAi({ instruction, files, errorContext });
      const result = applyAiResponse(ai);

      const assistantMessage = {
        id: uuid(),
        role: 'assistant' as const,
        content: ai.assistant_message,
        createdAt: Date.now(),
        versionIdApplied: result.versionId,
        diffSummary: result.diffSummary
      };

      void saveVersion(projectId, ai.commit_message, useBuilderStore.getState().files, assistantMessage).catch(
        () => undefined
      );
      markSaved();
      toast.success('Changes applied');
      setInput('');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error(`AI request timed out after ${AI_TIMEOUT_SECONDS}s. Try again if the model was still working.`);
      } else {
        toast.error(error instanceof Error ? error.message : 'Could not process AI request');
      }
    } finally {
      setBusy(false);
      setSaving(false);
    }
  };

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">AI Chat</h3>
      </div>

      <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="rounded-2xl bg-white/20 p-3 text-sm text-slate-700 dark:bg-slate-700/40 dark:text-slate-200">
            Describe your site and I will handle the layout, styling, structure, and supporting files automatically.
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl p-3 text-sm ${message.role === 'user' ? 'bg-cyan-500/25 text-slate-900 dark:text-white' : 'bg-white/30 text-slate-800 dark:bg-slate-700/50 dark:text-slate-100'}`}
          >
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              {message.role === 'user' ? 'You' : 'CodedAI'}
            </div>
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.diffSummary?.length ? (
              <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {message.diffSummary.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            ) : null}
            {message.versionIdApplied ? (
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    rollbackVersion(message.versionIdApplied!);
                    toast.success('Applied selected version');
                  }}
                >
                  Apply changes
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const idx = versions.findIndex((v) => v.id === message.versionIdApplied);
                    const previous = idx > 0 ? versions[idx - 1] : null;
                    if (!previous) {
                      toast.error('No previous version available');
                      return;
                    }
                    rollbackVersion(previous.id);
                    toast.success('Rolled back to previous version');
                  }}
                >
                  Rollback
                </Button>
              </div>
            ) : null}
          </div>
        ))}

        {busy ? (
          <div className="rounded-2xl bg-white/30 p-3 text-sm text-slate-800 dark:bg-slate-700/50 dark:text-slate-100">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
              CodedAI
            </div>
            <p>{WORKING_STEPS[workingStep]}...</p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 space-y-2">
        <Textarea
          placeholder="Build a premium SaaS landing page for an AI startup with a polished, modern feel..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {IS_STATIC_EXPORT
            ? 'This GitHub Pages build keeps preview and Firebase flows, but AI editing needs a server deployment such as Vercel.'
            : 'You only need to describe what you want. The AI will decide when to add components, styles, and interactions.'}
        </p>
        <Button className="w-full" onClick={() => send()} disabled={busy || !input.trim()}>
          {busy ? 'Generating...' : IS_STATIC_EXPORT ? 'AI Unavailable on Pages' : 'Send'}
        </Button>
      </div>
    </GlassPanel>
  );
}

export async function fixPreviewWithAi(projectId: string, files: Record<string, string>, error: string) {
  if (IS_STATIC_EXPORT) {
    throw new Error('Fix with AI is unavailable on GitHub Pages. Deploy to Vercel to use AI routes.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instruction: 'Fix preview errors and keep behavior intact.', files, errorContext: error }),
      signal: controller.signal
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(parseErrorMessage(text) || 'Fix request failed');
    }

    const payload = (await response.json()) as AiResponsePayload;
    await saveVersion(projectId, payload.commit_message, files);
    return payload;
  } finally {
    clearTimeout(timeoutId);
  }
}
