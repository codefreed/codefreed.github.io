'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Paperclip, Plus, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useBuilderStore } from '@/lib/store/builder-store';
import { saveChatMessage, saveVersion } from '@/lib/project-service';
import { AI_MODELS, getAiModelLabel, type AiModel, type AiResponsePayload } from '@/lib/ai/schema';
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

async function runAi(params: {
  instruction: string;
  model: AiModel;
  files: Record<string, string>;
  attachments?: Array<{ name: string; content: string }>;
  errorContext?: string;
}) {
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
  const [attachments, setAttachments] = useState<Array<{ name: string; content: string }>>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { files, messages, versions, addUserMessage, applyAiResponse, rollbackVersion, setSaving, markSaved } =
    useBuilderStore();
  const selectedModel = useBuilderStore((state) => state.selectedModel);

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
    const baseInstruction = (overrideInstruction ?? input).trim();
    if (!baseInstruction && !attachments.length) return;
    if (IS_STATIC_EXPORT) {
      toast.error('AI editing is unavailable on GitHub Pages. Deploy this app to Vercel to enable server-backed AI.');
      return;
    }

    try {
      setBusy(true);
      setSaving(true);
      const visibleMessage = baseInstruction || `Use the ${attachments.length} attached file${attachments.length === 1 ? '' : 's'} as context.`;
      const userMessageId = addUserMessage(visibleMessage);
      void saveChatMessage(projectId, {
        id: userMessageId,
        role: 'user',
        content: visibleMessage,
        createdAt: Date.now()
      }).catch(() => undefined);

      const ai = await runAi({
        instruction: baseInstruction || 'Use the attached files as reference and decide the best direction for the site.',
        model: selectedModel,
        files,
        attachments,
        errorContext
      });
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
      setAttachments([]);
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

  const uploadFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles?.length) {
      return;
    }

    try {
      const nextAttachments = await Promise.all(
        Array.from(selectedFiles).map(async (file) => ({
          name: file.name,
          content: (await file.text()).slice(0, 40_000)
        }))
      );

      setAttachments((current) => [...current, ...nextAttachments]);
      toast.success(`${nextAttachments.length} file${nextAttachments.length > 1 ? 's' : ''} attached for AI context`);
    } catch {
      toast.error('Could not read one or more files');
    }
  };

  return (
    <GlassPanel className="relative flex h-full min-w-0 flex-col overflow-hidden">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">AI Chat</h3>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
          Using {getAiModelLabel(selectedModel)}
        </div>
      </div>

      <div
        ref={messagesRef}
        className="flex-1 space-y-4 overflow-y-auto pr-1 pb-52 [-webkit-overflow-scrolling:touch] overscroll-contain sm:pb-64"
      >
        {messages.length === 0 ? (
          <div className="flex">
            <div className="max-w-[88%] rounded-[1.5rem] rounded-bl-md border border-white/30 bg-white/55 px-4 py-3 text-sm text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:bg-slate-700/40 dark:text-slate-200">
              Describe your site and I will handle the layout, styling, structure, and supporting files automatically.
            </div>
          </div>
        ) : null}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] px-4 py-3 text-sm shadow-[0_12px_28px_rgba(15,23,42,0.08)] ${
                message.role === 'user'
                  ? 'rounded-[1.5rem] rounded-br-md bg-[linear-gradient(135deg,rgba(38,198,249,0.18),rgba(255,138,26,0.18))] text-slate-900'
                  : 'rounded-[1.5rem] rounded-bl-md border border-white/30 bg-white/60 text-slate-800 dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-100'
              }`}
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {message.role === 'user' ? 'You' : 'CodeFreed'}
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
                <div className="mt-3 flex flex-wrap gap-2">
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
          </div>
        ))}

        {busy ? (
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-[1.5rem] rounded-bl-md border border-white/30 bg-white/60 px-4 py-3 text-sm text-slate-800 shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-100">
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
                CodeFreed
              </div>
              <p>{WORKING_STEPS[workingStep]}...</p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-3 bottom-4 z-10 sm:inset-x-4 sm:bottom-6 lg:bottom-7">
        <input
          ref={fileInputRef}
          className="hidden"
          multiple
          type="file"
          onChange={(event) => {
            void uploadFiles(event.target.files);
            event.target.value = '';
          }}
        />
        <p className="pointer-events-auto mb-2 px-2 text-[11px] text-slate-500 dark:text-slate-400">
          {IS_STATIC_EXPORT
            ? 'AI editing needs a server deployment such as Vercel.'
            : 'AI can make mistakes. Check important info.'}
        </p>
        <div className="pointer-events-auto rounded-[1.75rem] border border-white/20 bg-[rgba(255,255,255,0.88)] p-2.5 shadow-[0_24px_70px_rgba(15,23,42,0.22)] backdrop-blur-2xl dark:bg-[rgba(15,23,42,0.88)] sm:rounded-[2rem] sm:p-3">
          {attachments.length ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachments.map((file) => (
                <span
                  key={`${file.name}-${file.content.length}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900/8 px-3 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-slate-200"
                >
                  <Paperclip className="h-3 w-3" />
                  {file.name}
                  <button
                    type="button"
                    onClick={() => setAttachments((current) => current.filter((item) => item !== file))}
                    className="text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap items-end gap-2 sm:flex-nowrap sm:gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}
              className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,211,238,0.16)] disabled:cursor-not-allowed disabled:opacity-60 dark:text-white sm:h-12 sm:w-12"
              aria-label="Upload files"
            >
              <Plus className="h-5 w-5" />
            </button>

            <div className="relative shrink-0">
              <Box className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-300" />
              <select
                value={selectedModel}
                onChange={(event) => useBuilderStore.getState().setSelectedModel(event.target.value as AiModel)}
                className="glass h-11 w-11 appearance-none rounded-full text-transparent outline-none transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,211,238,0.16)] focus:ring-2 focus:ring-cyan-300/40 dark:focus:ring-cyan-500/20 sm:h-12 sm:w-12"
                aria-label="Select AI model"
              >
                {AI_MODELS.map((model) => (
                  <option key={model} value={model} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                    {getAiModelLabel(model)}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0 flex-1 basis-full sm:basis-auto">
              <textarea
                className="min-h-[60px] w-full resize-none border-0 bg-transparent px-1 py-1.5 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-400 sm:min-h-[72px] sm:py-2"
                placeholder="Describe the site you want. The AI will choose the direction, expand the scope, and add what feels necessary..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <Button
              className="h-11 shrink-0 rounded-full px-5 sm:h-12"
              onClick={() => send()}
              disabled={busy || (!input.trim() && !attachments.length)}
            >
              {busy ? 'Generating...' : IS_STATIC_EXPORT ? 'Unavailable' : 'Send'}
            </Button>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export async function fixPreviewWithAi(projectId: string, files: Record<string, string>, error: string) {
  if (IS_STATIC_EXPORT) {
    throw new Error('Fix with AI is unavailable on GitHub Pages. Deploy to Vercel to use AI routes.');
  }

  const model = useBuilderStore.getState().selectedModel;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instruction: 'Fix preview errors and keep behavior intact.',
        model,
        files,
        errorContext: error
      }),
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
