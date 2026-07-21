// Shared wrapper helper for the endpoints of the backend API.
import 'server-only';

// Base URL of the backend REST API.
export const API_BASE_URL = (process.env.API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');

// API rejected payload error.
export interface ApiValidationError {
  field: string;
  message: string;
}

// Generic response format used by every endpoint.
export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Enums.
export type Role = 'ADMIN' | 'CONTRIBUTOR';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

// Minimal user object used in references.
export interface UserSummary {
  id: string;
  email: string;
  name: string | null;
}

// Authentication user object used in auth endpoints.
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Member user object used in project endpoints.
export interface ProjectMember {
  id: string;
  role: Role;
  joinedAt: string;
  userId: string;
  projectId: string;
  user: UserSummary;
}

// Assigned user object used in task endpoints.
export interface TaskAssignee {
  id: string;
  assignedAt: string;
  user: UserSummary;
}

// Task comment object.
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: UserSummary;
  task?: { id: string; title: string };
  taskId?: string;
  authorId?: string;
}

// Task object.
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  creatorId: string;
  creator?: UserSummary;
  project?: { id: string; name: string; description?: string | null };
  assignees?: TaskAssignee[];
  comments?: Comment[];
}

// Project object.
export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: UserSummary;
  members: ProjectMember[];
  tasks?: Task[];
  userRole?: Role | null;
  _count?: { tasks: number };
}

// Options accepted by the API request helper.
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
  query?: Record<string, string | number | undefined>;
}

/**
 * Perform a request at the backend API and return the parsed JSON body.
 * @param path API path starting with a slash (e.g., '/auth/login').
 * @param options Method, JSON body, bearer token, and query parameters.
 * @returns The parsed response body typed as 'T'.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, query } = options;

  let url = `${API_BASE_URL}${path}`;
  if (query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) params.set(key, String(value));
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  return (await response.json()) as T;
}

/**
 * Extract the most relevant human-readable error message from a failed ApiResponse.
 * @param response A response where success is false.
 * @param fallback Message to use when the API provided none.
 * @returns The most relevant error message available.
 */
export function apiErrorMessage(response: ApiResponse<unknown>, fallback: string): string {
  const data = response.data as { errors?: ApiValidationError[] } | undefined;
  return data?.errors?.[0]?.message ?? response.message ?? fallback;
}
