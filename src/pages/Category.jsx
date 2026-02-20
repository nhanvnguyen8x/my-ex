import { useParams, Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Card,
} from '@mui/material'
import {
  selectFilteredReviews,
  setFilterCategory,
  setFilterSubcategory,
  setFilterProduct,
  setFilterYear,
} from '../store/reviewsSlice'
import {
  selectSubcategoriesByCategoryId,
  selectProductsBySubcategoryId,
} from '../store/categoriesSlice'
import { useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'

export default function Category() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const category = categories.find((c) => c.slug === slug)
  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, category?.id))
  const filterSubcategoryId = useSelector((s) => s.reviews.filterSubcategoryId)
  const filterProductId = useSelector((s) => s.reviews.filterProductId)
  const filterYear = useSelector((s) => s.reviews.filterYear)
  const products = useSelector((s) => selectProductsBySubcategoryId(s, filterSubcategoryId))
  const reviews = useSelector(selectFilteredReviews)
  const allReviewsForCategory = useSelector((s) => {
    const { items, filterCategory, filterSubcategoryId, filterProductId } = s.reviews
    let list = filterCategory ? items.filter((r) => r.categoryId === filterCategory) : []
    if (filterSubcategoryId) list = list.filter((r) => r.subcategoryId === filterSubcategoryId)
    if (filterProductId) list = list.filter((r) => r.productId === filterProductId)
    return list
  })
  const availableYears = [...new Set(allReviewsForCategory.map((r) => r.year).filter(Boolean))].sort((a, b) => b - a)

  useEffect(() => {
    if (category) dispatch(setFilterCategory(category.id))
    return () => {
      dispatch(setFilterCategory(null))
      dispatch(setFilterSubcategory(null))
      dispatch(setFilterProduct(null))
      dispatch(setFilterYear(null))
    }
  }, [category, dispatch])

  if (!category) {
    return (
      <Box>
        <Typography paragraph>Category not found.</Typography>
        <Button component={RouterLink} to="/">
          Back to Home
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          {category.icon}
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontStyle: 'italic' }} gutterBottom>
          {category.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {category.description}
        </Typography>
        <Button
          component={RouterLink}
          to={`/write/${category.slug}`}
          variant="contained"
        >
          Write a review
        </Button>
      </Box>

      {subcategories.length > 0 && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            {category?.id === 'company' ? 'Country' : 'Brand / Subcategory'}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} justifyContent="center">
            <Chip
              label="All"
              onClick={() => dispatch(setFilterSubcategory(null))}
              color={!filterSubcategoryId ? 'primary' : 'default'}
              variant={!filterSubcategoryId ? 'filled' : 'outlined'}
            />
            {subcategories.map((sub) => (
              <Chip
                key={sub.id}
                label={sub.name}
                onClick={() => dispatch(setFilterSubcategory(sub.id))}
                color={filterSubcategoryId === sub.id ? 'primary' : 'default'}
                variant={filterSubcategoryId === sub.id ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Box>
      )}

      {filterSubcategoryId && products.length > 0 && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Product
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} justifyContent="center">
            <Chip
              label="All"
              onClick={() => dispatch(setFilterProduct(null))}
              color={!filterProductId ? 'primary' : 'default'}
              variant={!filterProductId ? 'filled' : 'outlined'}
              size="small"
            />
            {products.map((prod) => (
              <Chip
                key={prod.id}
                label={prod.name}
                onClick={() => dispatch(setFilterProduct(prod.id))}
                color={filterProductId === prod.id ? 'primary' : 'default'}
                variant={filterProductId === prod.id ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      )}

      {availableYears.length > 0 && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Year
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} justifyContent="center">
            <Chip
              label="All"
              onClick={() => dispatch(setFilterYear(null))}
              color={!filterYear ? 'primary' : 'default'}
              variant={!filterYear ? 'filled' : 'outlined'}
              size="small"
            />
            {availableYears.map((y) => (
              <Chip
                key={y}
                label={String(y)}
                onClick={() => dispatch(setFilterYear(y))}
                color={filterYear === y ? 'primary' : 'default'}
                variant={filterYear === y ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      )}

      {reviews.length === 0 ? (
        <Card variant="outlined" sx={{ py: 4, textAlign: 'center' }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No reviews in this category yet. Share your experience!
          </Typography>
          <Button
            component={RouterLink}
            to={`/write/${category.slug}`}
            variant="outlined"
          >
            Write a review
          </Button>
        </Card>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showCategory
              showSubcategory
              showProduct
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}
