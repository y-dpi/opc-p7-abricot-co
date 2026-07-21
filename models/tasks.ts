// Wrappers for the task endpoints of the backend API.
import { type ApiResponse, type Priority, request, type Task, type TaskStatus } from './shared';

// Body of 'POST /projects/:id/tasks'.
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
  assigneeIds?: string[];
}

// Body of 'PUT /projects/:id/tasks/:taskId'.
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  dueDate?: string;
  assigneeIds?: string[];
}

// Stat data returned by 'GET /dashboard/stats'.
export interface DashboardStats {
  tasks: {
    total: number;
    urgent: number;
    overdue: number;
    byStatus: Record<string, number>;
  };
  projects: {
    total: number;
  };
}

/**
 * Create a task in a project.
 * API endpoint 'POST /projects/:id/tasks' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param input Title, optional details, priority, due date, and assignees.
 * @returns The created task with its relations.
 */
export function createTask(
  token: string,
  projectId: string,
  input: CreateTaskInput,
): Promise<ApiResponse<{ task: Task }>> {
  return request<ApiResponse<{ task: Task }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks`,
    { method: 'POST', body: input, token },
  );
}

/**
 * List every task in a project.
 * API endpoint 'GET /projects/:id/tasks' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @returns The project tasks with assignees and comments.
 */
export function getTasks(
  token: string,
  projectId: string,
): Promise<ApiResponse<{ tasks: Task[] }>> {
  return request<ApiResponse<{ tasks: Task[] }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks`,
    { token },
  );
}

/**
 * Get a single task in a project.
 * API endpoint 'GET /projects/:id/tasks/:taskId' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @returns The project task with assignees and comments.
 */
export function getTask(
  token: string,
  projectId: string,
  taskId: string,
): Promise<ApiResponse<{ task: Task }>> {
  return request<ApiResponse<{ task: Task }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`,
    { token },
  );
}

/**
 * Update a task in a project.
 * API endpoint 'PUT /projects/:id/tasks/:taskId' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @param input Fields to update (omit a field to leave it unchanged).
 * @returns The updated project task with assignees and comments.
 */
export function updateTask(
  token: string,
  projectId: string,
  taskId: string,
  input: UpdateTaskInput,
): Promise<ApiResponse<{ task: Task }>> {
  return request<ApiResponse<{ task: Task }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`,
    { method: 'PUT', body: input, token },
  );
}

/**
 * Delete a task in a project.
 * API endpoint 'DELETE /projects/:id/tasks/:taskId' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @returns A response with no data payload.
 */
export function deleteTask(
  token: string,
  projectId: string,
  taskId: string,
): Promise<ApiResponse<undefined>> {
  return request<ApiResponse<undefined>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`,
    { method: 'DELETE', token },
  );
}

/**
 * List the tasks assigned to a user across all projects.
 * API endpoint 'GET /dashboard/assigned-tasks' (private).
 * @param token Bearer token of the authenticated user.
 * @returns The user assigned tasks with project, assignees, and comments.
 */
export function getAssignedTasks(token: string): Promise<ApiResponse<{ tasks: Task[] }>> {
  return request<ApiResponse<{ tasks: Task[] }>>('/dashboard/assigned-tasks', { token });
}

/**
 * Get the current user dashboard statistics.
 * API endpoint 'GET /dashboard/stats' (private).
 * @param token Bearer token of the authenticated user.
 * @returns Aggregated task and project counts.
 */
export function getDashboardStats(token: string): Promise<ApiResponse<{ stats: DashboardStats }>> {
  return request<ApiResponse<{ stats: DashboardStats }>>('/dashboard/stats', { token });
}
