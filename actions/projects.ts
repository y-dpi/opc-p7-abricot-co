'use server';

// Server actions bridging the project forms and the project API models.
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  addContributor as apiAddContributor,
  createProject as apiCreateProject,
  deleteProject as apiDeleteProject,
  removeContributor as apiRemoveContributor,
  updateProject as apiUpdateProject,
} from '../models/projects';
import { apiErrorMessage } from '../models/shared';
import { type FormState, requireToken } from './shared';

// Split a comma or newline separated list into trimmed emails.
function parseEmails(raw: string): string[] {
  return raw.split(/[,\n]/).map((email) => email.trim()).filter(Boolean);
}

// Create a project and open its page.
export async function createProject(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const contributors = parseEmails(String(formData.get('contributors') ?? ''));

  if (!name) return { error: 'Le titre est requis.' };

  let body;
  try {
    body = await apiCreateProject(token, {
      name,
      description: description || undefined,
      contributors: contributors.length ? contributors : undefined,
    });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success || !body.data?.project) {
    return { error: apiErrorMessage(body, 'Impossible de créer le projet.') };
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
  redirect(`/projects/${body.data.project.id}`);
}

// Update a project name and description, add any new contributor emails, and remove un-ticked members.
export async function updateProject(id: string, currentMemberIds: string[], _prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const contributors = parseEmails(String(formData.get('contributors') ?? ''));

  // Members still ticked in the dropdown, anything missing was un-ticked and should be removed.
  const keptMemberIds = formData.getAll('memberIds').map(String);
  const removedMemberIds = currentMemberIds.filter((memberId) => !keptMemberIds.includes(memberId));

  if (!name) return { error: 'Le titre est requis.' };

  let body;
  try {
    body = await apiUpdateProject(token, id, { name, description });
    for (const email of contributors) {
      await apiAddContributor(token, id, { email });
    }
    for (const memberId of removedMemberIds) {
      await apiRemoveContributor(token, id, memberId);
    }
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success) {
    return { error: apiErrorMessage(body, 'Impossible de modifier le projet.') };
  }

  revalidatePath('/projects');
  revalidatePath(`/projects/${id}`);
  return { ok: true };
}

// Delete a project and return to the project list.
export async function deleteProject(id: string): Promise<void> {
  const token = await requireToken();
  await apiDeleteProject(token, id);
  revalidatePath('/projects');
  redirect('/projects');
}
