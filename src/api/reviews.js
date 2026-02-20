import { apiClient } from './client'

/**
 * Get all reviews.
 * GET /reviews
 * Returns: Review[] or { data: Review[] }
 */
export async function getReviews() {
  const { data } = await apiClient.get('/reviews')
  return Array.isArray(data) ? data : data?.data ?? []
}

/**
 * Get a single review by id.
 * GET /reviews/:id
 * Returns: Review
 */
export async function getReviewById(id) {
  const { data } = await apiClient.get(`/reviews/${id}`)
  return data?.data ?? data
}

/**
 * Publish (create) a new review.
 * POST /reviews
 * Body: { title, categoryId?, subcategoryId?, productId?, year?, rating?, body }
 * Returns: created Review
 */
export async function createReview(payload) {
  const { data } = await apiClient.post('/reviews', payload)
  return data?.data ?? data
}

/**
 * Delete a review by id.
 * DELETE /reviews/:id
 */
export async function deleteReviewById(id) {
  await apiClient.delete(`/reviews/${id}`)
  return id
}
