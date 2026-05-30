/**
 * API / backend origin resolution.
 *
 * **Defaults (production):**
 *   Backend: https://backend.cobrother.com
 *   App:     https://trial.cobrother.com
 *
 * **Local dev** — override via `.env.local` or build-time env, e.g.:
 *   VITE_API_URL=http://localhost:8080
 *   VITE_APP_URL=http://localhost:5173
 */
export const PRODUCTION_API_ORIGIN = 'https://backend.cobrother.com';
export const PRODUCTION_APP_URL = 'https://trial.cobrother.com';

const remoteApiBase =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';

/** Spring Boot origin for OAuth redirects and SockJS. */
export const API_ORIGIN = remoteApiBase || PRODUCTION_API_ORIGIN;

/** Axios baseURL */
export const API_BASE_URL = remoteApiBase || PRODUCTION_API_ORIGIN;

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL || PRODUCTION_APP_URL;
