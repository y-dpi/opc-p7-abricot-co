// Wrappers for the project endpoints of the backend API.
import { type ApiResponse, type Project, request, type Role } from './shared';

// Body of 'POST /projects'.
export interface CreateProjectInput {
  name: string;
  description?: string;
  contributors?: string[];
}

// Body of 'PUT /projects/:id'.
export interface UpdateProjectInput {
  name?: string;
  description?: string;
}

// Body of 'POST /projects/:id/contributors'.
export interface AddContributorInput {
  email: string;
  role?: Role;
}

/**
 * Create a new project.
 * API endpoint 'POST /projects' (private).
 * @param token Bearer token of the authenticated user.
 * @param input Name, optional description, and optional contributor emails.
 * @returns The newly created project with its owner and members.
 */
export function createProject(
  token: string,
  input: CreateProjectInput,
): Promise<ApiResponse<{ project: Project }>> {
  return request<ApiResponse<{ project: Project }>>('/projects', {
    method: 'POST',
    body: input,
    token,
  });
}

/**
 * List every project the user owns or contributes to.
 * API endpoint 'GET /projects' (private).
 * @param token Bearer token of the authenticated user.
 * @returns The user projects with their userRole.
 */
export function getProjects(token: string): Promise<ApiResponse<{ projects: Project[] }>> {
  return request<ApiResponse<{ projects: Project[] }>>('/projects', { token });
}

/**
 * Get a single project with its tasks.
 * API endpoint 'GET /projects/:id' (private).
 * @param token Bearer token of the authenticated user.
 * @param id Target project ID.
 * @returns The project with their members, tasks, and userRole.
 */
export function getProject(token: string, id: string): Promise<ApiResponse<{ project: Project }>> {
  return request<ApiResponse<{ project: Project }>>(`/projects/${encodeURIComponent(id)}`, { token });
}

/**
 * Update a project (admin only).
 * API endpoint 'PUT /projects/:id' (private).
 * @param token Bearer token of the authenticated user.
 * @param id Target project ID.
 * @param input New name and/or description.
 * @returns The updated project.
 */
export function updateProject(
  token: string,
  id: string,
  input: UpdateProjectInput,
): Promise<ApiResponse<{ project: Project }>> {
  return request<ApiResponse<{ project: Project }>>(`/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: input,
    token,
  });
}

/**
 * Delete a project (owner only).
 * API endpoint 'DELETE /projects/:id' (private).
 * @param token Bearer token of the authenticated user.
 * @param id Target project ID.
 * @returns A response with no data payload.
 */
export function deleteProject(token: string, id: string): Promise<ApiResponse<undefined>> {
  return request<ApiResponse<undefined>>(`/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  });
}

/**
 * Add a contributor to a project (admin only).
 * API endpoint 'POST /projects/:id/contributors' (private).
 * @param token Bearer token of the authenticated user.
 * @param id Target project ID.
 * @param input Contributor email and optional role.
 * @returns A response with no data payload.
 */
export function addContributor(
  token: string,
  id: string,
  input: AddContributorInput,
): Promise<ApiResponse<undefined>> {
  return request<ApiResponse<undefined>>(`/projects/${encodeURIComponent(id)}/contributors`, {
    method: 'POST',
    body: input,
    token,
  });
}

/**
 * Remove a contributor from a project (admin only).
 * API endpoint 'DELETE /projects/:id/contributors/:userId' (private).
 * @param token Bearer token of the authenticated user.
 * @param id Target project ID.
 * @param userId ID of the member to remove.
 * @returns A response with no data payload.
 */
export function removeContributor(
  token: string,
  id: string,
  userId: string,
): Promise<ApiResponse<undefined>> {
  return request<ApiResponse<undefined>>(
    `/projects/${encodeURIComponent(id)}/contributors/${encodeURIComponent(userId)}`,
    { method: 'DELETE', token },
  );
}

/**
 * List the projects in which the user has assigned tasks, each including only those tasks.
 * API endpoint 'GET /dashboard/projects-with-tasks' (private).
 * @param token Bearer token of the authenticated user.
 * @returns Projects with only the user assigned tasks.
 */
export function getProjectsWithTasks(token: string): Promise<ApiResponse<{ projects: Project[] }>> {
  return request<ApiResponse<{ projects: Project[] }>>('/dashboard/projects-with-tasks', { token });
}
