export function isValidPhoneNumber(value) {
  const phone = (value || '').trim();
  return /^\d{10}$/.test(phone);
}

export function sanitizePhoneInput(value) {
  return (value || '').replace(/\D/g, '').slice(0, 10);
}
