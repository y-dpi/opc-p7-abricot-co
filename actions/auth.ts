'use server';

import { redirect } from 'next/navigation';

import { createSession, deleteSession } from '../middleware/session';

// Base URL of the backend REST API.
const API_URL = process.env.API_URL ?? 'http://localhost:8000';

// State returned to the auth forms via useActionState.
type AuthState = { error?: string };

// API auth response interface.
interface AuthResponse {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: { id: string; email: string; name: string | null };
    errors?: { field: string; message: string }[];
  };
}

// Read the most relevant error message of an API response.
function apiError(body: AuthResponse, fallback: string): string {
  return body.data?.errors?.[0]?.message ?? body.message ?? fallback;
}

// Call auth endpoints, open a session, and redirect on success.
async function authenticate(endpoint: string, email: string, password: string, fallback: string): Promise<AuthState> {
  let body: AuthResponse;
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    body = (await response.json()) as AuthResponse;
    if (!response.ok || !body.success || !body.data?.token || !body.data.user) {
      return { error: apiError(body, fallback) };
    }
  } catch {
    return { error: 'Impossible de contacter le serveur.' };
  }

  // Set cookie and redirect.
  await createSession({ token: body.data.token, user: body.data.user });
  redirect('/dashboard');
}

// Authenticate an existing user.
export async function login(_prev: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  return authenticate('/auth/login', email, password, 'Impossible de se connecter.');
}

// Register a new user and open a session.
export async function register(_prev: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  return authenticate('/auth/register', email, password, 'Impossible de s\'inscrire.');
}

// End the session and return to the login page.
export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/login');
}
