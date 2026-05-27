/**
 * API / backend origin resolution.
 *
 * **Production defaults** (switch to local before local dev):
 *   Backend: https://backend.cobrother.com
 *   App:     https://cobrother.com
 *
 * **Override** — set in `.env`:
 *   VITE_API_URL=https://backend.cobrother.com
 *   VITE_APP_URL=https://cobrother.com
 */
export const PRODUCTION_API_ORIGIN = 'https://backend.cobrother.com';
export const PRODUCTION_APP_URL = 'https://cobrother.com';

const remoteApiBase =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';

const LOCAL_API_ORIGIN = 'http://localhost:8080';

/** Spring Boot origin for OAuth redirects and SockJS. */
export const API_ORIGIN =
  remoteApiBase || (import.meta.env.DEV ? LOCAL_API_ORIGIN : PRODUCTION_API_ORIGIN);

/** Axios baseURL — local dev defaults to localhost:8080 unless VITE_API_URL is set. */
export const API_BASE_URL =
  remoteApiBase || (import.meta.env.DEV ? LOCAL_API_ORIGIN : PRODUCTION_API_ORIGIN);

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL ||
  (typeof window !== 'undefined'
    ? window.location.origin
    : PRODUCTION_APP_URL);

