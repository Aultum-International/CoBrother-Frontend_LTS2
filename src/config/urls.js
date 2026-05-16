/** Production defaults — override with VITE_API_URL / VITE_APP_URL for local dev */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://backend.cobrother.com';

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL || 'https://cobrother.com';
