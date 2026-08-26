export function getAuthToken() {
  return localStorage.getItem('authToken');
}

/** Combina headers extra con "Authorization: Bearer <token>" si hay sesión iniciada. */
export function withAuthHeader(extraHeaders = {}) {
  const token = getAuthToken();
  return token ? { ...extraHeaders, Authorization: `Bearer ${token}` } : extraHeaders;
}
