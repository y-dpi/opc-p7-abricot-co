// Wrappers for the comment endpoints of the backend API.
import { type ApiResponse, type Comment, request } from './shared';

// Body of 'POST /projects/:id/tasks/:taskId/comments'.
export interface CreateCommentInput {
  content: string;
}

// Body of 'PUT /projects/:id/tasks/:taskId/comments/:commentId'.
export interface UpdateCommentInput {
  content: string;
}

/**
 * Add a comment to a task.
 * API endpoint 'POST /projects/:id/tasks/:taskId/comments' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @param input Comment content.
 * @returns The newly created comment with its author.
 */
export function createComment(
  token: string,
  projectId: string,
  taskId: string,
  input: CreateCommentInput,
): Promise<ApiResponse<{ comment: Comment }>> {
  return request<ApiResponse<{ comment: Comment }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}/comments`,
    { method: 'POST', body: input, token },
  );
}

/**
 * List every comment of a task.
 * API endpoint 'GET /projects/:id/tasks/:taskId/comments' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @returns The comments with their authors (oldest first).
 */
export function getComments(
  token: string,
  projectId: string,
  taskId: string,
): Promise<ApiResponse<{ comments: Comment[] }>> {
  return request<ApiResponse<{ comments: Comment[] }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}/comments`,
    { token },
  );
}

/**
 * Get a single comment.
 * API endpoint 'GET /projects/:id/tasks/:taskId/comments/:commentId' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @param commentId Target comment ID.
 * @returns The comment with its author.
 */
export function getComment(
  token: string,
  projectId: string,
  taskId: string,
  commentId: string,
): Promise<ApiResponse<{ comment: Comment }>> {
  return request<ApiResponse<{ comment: Comment }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}/comments/${encodeURIComponent(commentId)}`,
    { token },
  );
}

/**
 * Update a comment (author only).
 * API endpoint 'PUT /projects/:id/tasks/:taskId/comments/:commentId' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @param commentId Target comment ID.
 * @param input New comment content.
 * @returns The updated comment with its author.
 */
export function updateComment(
  token: string,
  projectId: string,
  taskId: string,
  commentId: string,
  input: UpdateCommentInput,
): Promise<ApiResponse<{ comment: Comment }>> {
  return request<ApiResponse<{ comment: Comment }>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}/comments/${encodeURIComponent(commentId)}`,
    { method: 'PUT', body: input, token },
  );
}

/**
 * Delete a comment (author or project member who can moderate only).
 * API endpoint 'DELETE /projects/:id/tasks/:taskId/comments/:commentId' (private).
 * @param token Bearer token of the authenticated user.
 * @param projectId Target project ID.
 * @param taskId Target task ID.
 * @param commentId Target comment ID.
 * @returns A response with no data payload.
 */
export function deleteComment(
  token: string,
  projectId: string,
  taskId: string,
  commentId: string,
): Promise<ApiResponse<undefined>> {
  return request<ApiResponse<undefined>>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}/comments/${encodeURIComponent(commentId)}`,
    { method: 'DELETE', token },
  );
}
