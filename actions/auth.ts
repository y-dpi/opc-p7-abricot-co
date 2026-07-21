'use server';

import { redirect } from 'next/navigation';

import { createSession, deleteSession } from '../middleware/session';
import { type AuthData, login as apiLogin, register as apiRegister } from '../models/auth';
import { apiErrorMessage, type ApiResponse } from '../models/shared';

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

// End the session and return to the login page.
export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/login');
}
