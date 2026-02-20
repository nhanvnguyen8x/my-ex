import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || ''

/** In-memory auth token. Set on login/register, cleared on logout. (No persistence across refresh.) */
let authToken = null
export function setAuthToken(token) {
  authToken = token
}
export function getAuthToken() {
  return authToken
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.data ?? error.message)
    return Promise.reject(error)
  }
)

export const hasApi = () => Boolean(baseURL)
