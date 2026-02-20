import { apiClient, hasApi } from './client'

/**
 * Get all categories.
 * GET /categories
 * Returns: Category[] or { data: Category[] }
 */
export async function getCategories() {
  if (!hasApi()) return null
  const { data } = await apiClient.get('/categories')
  return Array.isArray(data) ? data : data?.data ?? []
}

/**
 * Get a single category by id.
 * GET /categories/:id
 * Returns: Category
 */
export async function getCategoryById(id) {
  if (!hasApi()) return null
  const { data } = await apiClient.get(`/categories/${id}`)
  return data?.data ?? data
}

/**
 * Get subcategories for a category.
 * GET /categories/:id/subcategories or GET /subcategories?categoryId=:id
 * Returns: Subcategory[]
 */
export async function getSubcategoriesByCategoryId(categoryId) {
  if (!hasApi()) return null
  try {
    const { data } = await apiClient.get(`/categories/${categoryId}/subcategories`)
    return Array.isArray(data) ? data : data?.data ?? []
  } catch {
    const { data } = await apiClient.get('/subcategories', { params: { categoryId } })
    return Array.isArray(data) ? data : data?.data ?? []
  }
}

/**
 * Get products for a subcategory.
 * GET /subcategories/:id/products or GET /products?subcategoryId=:id
 * Returns: Product[]
 */
export async function getProductsBySubcategoryId(subcategoryId) {
  if (!hasApi()) return null
  try {
    const { data } = await apiClient.get(`/subcategories/${subcategoryId}/products`)
    return Array.isArray(data) ? data : data?.data ?? []
  } catch {
    const { data } = await apiClient.get('/products', { params: { subcategoryId } })
    return Array.isArray(data) ? data : data?.data ?? []
  }
}
