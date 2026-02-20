import { apiClient } from './client'

/**
 * Sign in.
 * POST /auth/login
 * Body: { username, password }
 * Returns: { user: { id, username }, token?: string }
 */
export async function login(username, password) {
  const { data } = await apiClient.post('/auth/login', { username, password })
  return data?.data ?? data
}

/**
 * Sign up (register).
 * POST /auth/register
 * Body: { username, password }
 * Returns: { user: { id, username }, token?: string }
 */
export async function register(username, password) {
  const { data } = await apiClient.post('/auth/register', { username, password })
  return data?.data ?? data
}

/**
 * Sign out (invalidate session / revoke token on server if supported).
 * POST /auth/logout
 */
export async function logout() {
  try {
    await apiClient.post('/auth/logout')
  } catch (_) {
    // Still clear local state and token on client
  }
}
