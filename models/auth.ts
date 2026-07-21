// Wrappers for the authentication endpoints of the backend API.
import { type ApiResponse, type AuthUser, request, type UserSummary } from './shared';

// Body of 'POST /auth/register'.
export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

// Body of 'POST /auth/login'.
export interface LoginInput {
  email: string;
  password: string;
}

// Body of 'PUT /auth/profile'.
export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

// Body of 'PUT /auth/password'.
export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// Data returned by 'POST /auth/register' and 'POST /auth/login'.
export interface AuthData {
  user: AuthUser;
  token: string;
}

/**
 * Register a new user with the API.
 * API endpoint 'POST /auth/register' (public).
 * @param input Email, password, and optional display name.
 * @returns The newly created user info and token.
 */
export function register(input: RegisterInput): Promise<ApiResponse<AuthData>> {
  return request<ApiResponse<AuthData>>('/auth/register', { method: 'POST', body: input });
}

/**
 * Authenticate an existing user with the API.
 * API endpoint 'POST /auth/login' (public).
 * @param input Email and password.
 * @returns The user info and token.
 */
export function login(input: LoginInput): Promise<ApiResponse<AuthData>> {
  return request<ApiResponse<AuthData>>('/auth/login', { method: 'POST', body: input });
}

/**
 * Get the profile information of an authenticated user.
 * API endpoint 'GET /auth/profile' (private).
 * @param token Bearer token of the authenticated user.
 * @returns The user profile info.
 */
export function getProfile(token: string): Promise<ApiResponse<{ user: AuthUser }>> {
  return request<ApiResponse<{ user: AuthUser }>>('/auth/profile', { token });
}

/**
 * Update the profile information of an authenticated user.
 * API endpoint 'PUT /auth/profile' (private).
 * @param token Bearer token of the authenticated user.
 * @param input Desired name and/or email.
 * @returns The updated user profile info.
 */
export function updateProfile(
  token: string,
  input: UpdateProfileInput,
): Promise<ApiResponse<{ user: AuthUser }>> {
  return request<ApiResponse<{ user: AuthUser }>>('/auth/profile', {
    method: 'PUT',
    body: input,
    token,
  });
}

/**
 * Update the password of an authenticated user.
 * API endpoint 'PUT /auth/password' (private).
 * @param token Bearer token of the authenticated user.
 * @param input Current and new password.
 * @returns A response with no data payload.
 */
export function updatePassword(
  token: string,
  input: UpdatePasswordInput,
): Promise<ApiResponse<undefined>> {
  return request<ApiResponse<undefined>>('/auth/password', {
    method: 'PUT',
    body: input,
    token,
  });
}

/**
 * Search users by name or email for autocomplete.
 * API endpoint 'GET /users/search' (private).
 * @param token Bearer token of the authenticated user.
 * @param query Search term (the API requires at least 2 characters).
 * @returns Up to 10 matching users.
 */
export function searchUsers(
  token: string,
  query: string,
): Promise<ApiResponse<{ users: UserSummary[] }>> {
  return request<ApiResponse<{ users: UserSummary[] }>>('/users/search', {
    token,
    query: { query },
  });
}
