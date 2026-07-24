'use server';

// Server actions bridging the task forms and the task API models.
import { revalidatePath } from 'next/cache';

import { apiErrorMessage, type TaskStatus } from '../models/shared';
import {
  createTask as apiCreateTask,
  deleteTask as apiDeleteTask,
  updateTask as apiUpdateTask,
} from '../models/tasks';
import { type FormState, requireToken } from './shared';

// Map the UI status values to the API ones.
const API_STATUS: Record<string, TaskStatus> = {
  'todo': 'TODO',
  'in-progress': 'IN_PROGRESS',
  'done': 'DONE',
};

// Read the selected assignee ids from the form.
function readAssignees(formData: FormData): string[] {
  return formData.getAll('assigneeIds').map(String).filter(Boolean);
}

// Create a task inside a project.
export async function createTask(projectId: string, _prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const dueDate = String(formData.get('dueDate') ?? '').trim();
  const assigneeIds = readAssignees(formData);

  if (!title) return { error: 'Le titre est requis.' };

  let body;
  try {
    body = await apiCreateTask(token, projectId, {
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
      assigneeIds: assigneeIds.length ? assigneeIds : undefined,
    });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success || !body.data?.task) {
    return { error: apiErrorMessage(body, 'Impossible de créer la tâche.') };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath('/dashboard');
  return { ok: true };
}

// Update a task inside a project.
export async function updateTask(projectId: string, taskId: string, _prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const dueDate = String(formData.get('dueDate') ?? '').trim();
  const status = String(formData.get('status') ?? '');
  const assigneeIds = readAssignees(formData);

  if (!title) return { error: 'Le titre est requis.' };

  let body;
  try {
    body = await apiUpdateTask(token, projectId, taskId, {
      title,
      description,
      dueDate: dueDate || undefined,
      status: API_STATUS[status],
      assigneeIds,
    });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success) {
    return { error: apiErrorMessage(body, 'Impossible de modifier la tâche.') };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath('/dashboard');
  return { ok: true };
}

// Delete a task inside a project.
export async function deleteTask(projectId: string, taskId: string): Promise<void> {
  const token = await requireToken();
  await apiDeleteTask(token, projectId, taskId);
  revalidatePath(`/projects/${projectId}`);
  revalidatePath('/dashboard');
}
