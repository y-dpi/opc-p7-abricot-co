// Helpers to adapt the API task data to the frontend components.
import type { TaskStatus } from '../models/shared';

// UI status values used by the task components.
export type UiStatus = 'todo' | 'in-progress' | 'done';

// Map an API status to the UI one (CANCELLED falls back to 'todo').
const UI_STATUS: Record<TaskStatus, UiStatus> = {
  'TODO': 'todo',
  'IN_PROGRESS': 'in-progress',
  'DONE': 'done',
  'CANCELLED': 'todo',
};

// Convert an API status to the UI status.
export function toUiStatus(status: TaskStatus): UiStatus {
  return UI_STATUS[status] ?? 'todo';
}

// Format an ISO date as a short French date ('9 mars'), or a fallback when absent.
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return 'Aucune date';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Aucune date';
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(date);
}

// Format an ISO date as a French date and time ('23 mars, 11:20').
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(date);
}

// Build a Date from an ISO string, or undefined when absent/invalid.
export function toDate(iso: string | null | undefined): Date | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
