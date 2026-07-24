// Shared helpers for the server actions.
import 'server-only';

import { requireSession } from '../middleware/session';
import type { FormState } from '../utils/formState';

export type { FormState };

// Return the current session JWT, redirecting to login when it is missing.
export async function requireToken(): Promise<string> {
  const { token } = await requireSession();
  return token;
}
