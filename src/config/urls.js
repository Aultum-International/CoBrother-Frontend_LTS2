/**
 * API / backend origin resolution.
 *
 * **Production defaults** (committed for deploy / main):
 *   Backend: https://backend.cobrother.com
 *   App:     https://cobrother.com
 *
 * **Local dev** — create `.env.local` (gitignored), e.g.:
 *   VITE_API_URL=http://localhost:8080
 *   VITE_APP_URL=http://localhost:5173
 *   And set Vite proxy in vite.config.js to http://localhost:8080
 */
export const PRODUCTION_API_ORIGIN = 'https://backend.cobrother.com';
export const PRODUCTION_APP_URL = 'https://cobrother.com';

const remoteApiBase =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';

/** Spring Boot origin for OAuth redirects and SockJS. */
export const API_ORIGIN = remoteApiBase || PRODUCTION_API_ORIGIN;

/** Axios baseURL. */
export const API_BASE_URL = remoteApiBase || PRODUCTION_API_ORIGIN;

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL ||
  (typeof window !== 'undefined'
    ? window.location.origin
    : PRODUCTION_APP_URL);
