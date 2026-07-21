// Wrappers for the base endpoints of the backend API.
import { request } from './shared';

// Response of 'GET /health'.
export interface HealthResponse {
  success: boolean;
  message: string;
  timestamp: string;
  environment: string;
}

// Response of 'GET /'.
export interface ApiInfoResponse {
  success: boolean;
  message: string;
  version: string;
  endpoints: Record<string, unknown>;
}

/**
 * Check that the API is online.
 * API endpoint 'GET /health' (public).
 * @returns The health status of the API.
 */
export function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>('/health');
}

/**
 * Get the API's list of endpoints.
 * API endpoint 'GET /' (public).
 * @returns The base information of the API.
 */
export function getApiInfo(): Promise<ApiInfoResponse> {
  return request<ApiInfoResponse>('/');
}
