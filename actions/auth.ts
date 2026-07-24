'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSession, deleteSession } from '../middleware/session';
import { type AuthData, login as apiLogin, register as apiRegister, updatePassword as apiUpdatePassword, updateProfile as apiUpdateProfile } from '../models/auth';
import { apiErrorMessage, type ApiResponse } from '../models/shared';
import { type FormState, requireToken } from './shared';

// State returned to the auth forms via useActionState.
type AuthState = { error?: string };

// Shape of the login and register model wrappers.
type AuthCall = (input: { email: string; password: string }) => Promise<ApiResponse<AuthData>>;

// Authenticate, open a session, and redirect on success.
async function authenticate(
  call: AuthCall,
  email: string,
  password: string,
  fallback: string,
): Promise<AuthState> {
  let body: ApiResponse<AuthData>;
  try {
    body = await call({ email, password });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success || !body.data?.token || !body.data.user) {
    return { error: apiErrorMessage(body, fallback) };
  }

  // Open a session and redirect.
  const { token, user } = body.data;
  await createSession({ token, user: { id: user.id, email: user.email, name: user.name ?? null } });
  redirect('/dashboard');
}

// Authenticate an existing user and open a session.
export async function login(_prev: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  return authenticate(apiLogin, email, password, 'Impossible de se connecter.');
}

// Register a new user and open a session.
export async function register(_prev: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  return authenticate(apiRegister, email, password, 'Impossible de s\'inscrire.');
}

// Update the current user name and email.
export async function updateProfile(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();

  let body;
  try {
    body = await apiUpdateProfile(token, { name: name || undefined, email: email || undefined });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success || !body.data?.user) {
    return { error: apiErrorMessage(body, 'Impossible de modifier les informations.') };
  }

  // Refresh the session so the header and greeting reflect the new details.
  const { user } = body.data;
  await createSession({ token, user: { id: user.id, email: user.email, name: user.name ?? null } });

  revalidatePath('/account');
  revalidatePath('/dashboard');
  return { ok: true };
}

// Change the current user password.
export async function updatePassword(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();
  const currentPassword = String(formData.get('currentPassword') ?? '');
  const newPassword = String(formData.get('newPassword') ?? '');

  if (!currentPassword || !newPassword) return { error: 'Les deux mots de passe sont requis.' };

  let body;
  try {
    body = await apiUpdatePassword(token, { currentPassword, newPassword });
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  if (!body.success) {
    return { error: apiErrorMessage(body, 'Impossible de modifier le mot de passe.') };
  }

  return { ok: true };
}

// End the session and return to the login page.
export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/login');
}
