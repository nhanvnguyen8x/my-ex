import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Card,
  Link,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { selectFilteredReviews, setFilterCategory, setFilterSubcategory, setFilterProduct, setFilterYear, setSortBy } from '../store/reviewsSlice'
import { selectSubcategoriesByCategoryId, selectProductsBySubcategoryId, CATEGORY_IDS_WITHOUT_YEAR } from '../store/categoriesSlice'
import ReviewCard from '../components/ReviewCard'

export default function MyReviews() {
  const dispatch = useDispatch()
  const reviews = useSelector(selectFilteredReviews)
  const filterCategory = useSelector((s) => s.reviews.filterCategory)
  const filterSubcategoryId = useSelector((s) => s.reviews.filterSubcategoryId)
  const filterProductId = useSelector((s) => s.reviews.filterProductId)
  const filterYear = useSelector((s) => s.reviews.filterYear)
  const sortBy = useSelector((s) => s.reviews.sortBy)
  const categories = useSelector((s) => s.categories.list)
  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, filterCategory))
  const products = useSelector((s) => selectProductsBySubcategoryId(s, filterSubcategoryId))
  const showYearFilter = !CATEGORY_IDS_WITHOUT_YEAR.includes(filterCategory || '')

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontStyle: 'italic' }} gutterBottom>
        My reviews
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        All your submitted reviews in one place.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory ?? ''}
            label="Category"
            onChange={(e) => dispatch(setFilterCategory(e.target.value || null))}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {subcategories.length > 0 && (
          <FormControl sx={{ minWidth: 160 }} size="small">
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={filterSubcategoryId ?? ''}
              label="Subcategory"
              onChange={(e) => dispatch(setFilterSubcategory(e.target.value || null))}
            >
              <MenuItem value="">All</MenuItem>
              {subcategories.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {products.length > 0 && (
          <FormControl sx={{ minWidth: 160 }} size="small">
            <InputLabel>Product</InputLabel>
            <Select
              value={filterProductId ?? ''}
              label="Product"
              onChange={(e) => dispatch(setFilterProduct(e.target.value || null))}
            >
              <MenuItem value="">All</MenuItem>
              {products.map((prod) => (
                <MenuItem key={prod.id} value={prod.id}>
                  {prod.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {showYearFilter && (
          <FormControl sx={{ minWidth: 160 }} size="small">
            <InputLabel>Year</InputLabel>
            <Select
              value={filterYear ?? ''}
              label="Year"
              onChange={(e) => dispatch(setFilterYear(e.target.value ? parseInt(e.target.value, 10) : null))}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from({ length: (new Date().getFullYear() + 2) - 2015 }, (_, i) => 2015 + i)
                .reverse()
                .map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortBy}
            label="Sort"
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <MenuItem value="newest">Newest first</MenuItem>
            <MenuItem value="oldest">Oldest first</MenuItem>
            <MenuItem value="rating_high">Rating: high to low</MenuItem>
            <MenuItem value="rating_low">Rating: low to high</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {reviews.length === 0 ? (
        <Card variant="outlined" sx={{ py: 4, textAlign: 'center' }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            You haven't written any reviews yet.
          </Typography>
          <Button component={RouterLink} to="/write" variant="contained">
            Write your first review
          </Button>
        </Card>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showCategory showSubcategory showProduct />
          ))}
        </Stack>
      )}
    </Box>
  )
}
