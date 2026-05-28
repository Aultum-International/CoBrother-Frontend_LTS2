/**
 * API / backend origin resolution.
 *
 * **Defaults (local dev — no .env):**
 *   Backend: https://backend.cobrother.com
 *   App:     https://cobrother.com
 *
 * **Production** — use `.env.production` or deploy env, e.g.:
 *   VITE_API_URL=https://backend.cobrother.com
 *   VITE_APP_URL=https://cobrother.com
 */
export const PRODUCTION_API_ORIGIN = 'https://backend.cobrother.com';
export const PRODUCTION_APP_URL = 'https://cobrother.com';

const remoteApiBase =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';

/** Spring Boot origin for OAuth redirects and SockJS. */
export const API_ORIGIN = remoteApiBase || PRODUCTION_API_ORIGIN;

/** Axios baseURL */
export const API_BASE_URL = remoteApiBase || PRODUCTION_API_ORIGIN;

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL || PRODUCTION_APP_URL;
