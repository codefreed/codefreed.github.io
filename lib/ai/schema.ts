import { z } from 'zod';

export const AI_MODELS = ['gpt-4.1', 'gpt-5', 'gemini-2.5-flash'] as const;

export function getAiModelLabel(model: (typeof AI_MODELS)[number]) {
  switch (model) {
    case 'gpt-4.1':
      return 'GPT-4.1';
    case 'gpt-5':
      return 'GPT-5';
    case 'gemini-2.5-flash':
      return 'Gemini 2.5 Flash';
    default:
      return model;
  }
}

export const FileOpSchema = z.object({
  path: z.string().min(1),
  type: z.enum(['upsert', 'delete']),
  content: z.string().optional()
});

export const AiResponseSchema = z.object({
  assistant_message: z.string().min(1),
  commit_message: z.string().min(1),
  file_ops: z.array(FileOpSchema).min(1)
});

export const AiRequestSchema = z.object({
  instruction: z.string().min(1),
  model: z.enum(AI_MODELS).optional(),
  files: z.record(z.string()),
  projectMeta: z
    .object({
      name: z.string().optional(),
      id: z.string().optional()
    })
    .optional(),
  errorContext: z.string().optional()
});

export type AiResponsePayload = z.infer<typeof AiResponseSchema>;
export type AiModel = (typeof AI_MODELS)[number];
