'use server';

// Server actions bridging the comment field and the comment API models.
import { revalidatePath } from 'next/cache';

import { createComment as apiCreateComment, deleteComment as apiDeleteComment } from '../models/comments';
import { apiErrorMessage } from '../models/shared';
import { type FormState, requireToken } from './shared';

// Add a comment to a task.
export async function createComment(projectId: string, taskId: string, _prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const content = String(formData.get('content') ?? '').trim();

  if (!content) return { error: 'Le commentaire est vide.' };

  let body;
  try {
    body = await apiCreateComment(token, projectId, taskId, { content });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success) {
    return { error: apiErrorMessage(body, 'Impossible d\'ajouter le commentaire.') };
  }

  revalidatePath(`/projects/${projectId}`);
  return { ok: true };
}

// Delete a comment from a task.
export async function deleteComment(projectId: string, taskId: string, commentId: string): Promise<void> {
  const token = await requireToken();
  await apiDeleteComment(token, projectId, taskId, commentId);
  revalidatePath(`/projects/${projectId}`);
}
