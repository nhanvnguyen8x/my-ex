import { apiClient, hasApi } from './client'

/**
 * Fetch all reviews from the API.
 * Expected response: { data: Review[] } or Review[]
 */
export async function getReviews() {
  if (!hasApi()) return null
  const { data } = await apiClient.get('/reviews')
  return Array.isArray(data) ? data : data?.data ?? []
}

/**
 * Create a new review.
 * Body: { title, categoryId?, rating?, body }
 * Expected response: created Review object
 */
export async function createReview(payload) {
  if (!hasApi()) return null
  const { data } = await apiClient.post('/reviews', payload)
  return data
}

/**
 * Delete a review by id.
 */
export async function deleteReviewById(id) {
  if (!hasApi()) return null
  await apiClient.delete(`/reviews/${id}`)
  return id
}
