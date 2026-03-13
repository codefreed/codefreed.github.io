import { z } from 'zod';

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
