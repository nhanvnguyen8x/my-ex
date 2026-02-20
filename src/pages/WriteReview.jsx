import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  FormHelperText,
  Stack,
} from '@mui/material'
import { createReviewAsync } from '../store/reviewsSlice'
import { selectSubcategoriesByCategoryId, selectProductsBySubcategoryId, CATEGORY_IDS_WITHOUT_YEAR } from '../store/categoriesSlice'

export default function WriteReview() {
  const { categorySlug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const defaultCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : null

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(defaultCategory?.id || categories[0]?.id || '')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [productId, setProductId] = useState('')
  const [year, setYear] = useState('')
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const error = useSelector((s) => s.reviews.error)

  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, categoryId))
  const products = useSelector((s) => selectProductsBySubcategoryId(s, subcategoryId))
  const hasSubcategories = subcategories.length > 0
  const hasProducts = products.length > 0
  const showYear = !CATEGORY_IDS_WITHOUT_YEAR.includes(categoryId)
  const subcategoryLabel = categoryId === 'company' ? 'Country' : 'Subcategory'

  const handleCategoryChange = (newCategoryId) => {
    setCategoryId(newCategoryId)
    setSubcategoryId('')
    setProductId('')
  }

  const handleSubcategoryChange = (newSubcategoryId) => {
    setSubcategoryId(newSubcategoryId)
    setProductId('')
  }

  const user = useSelector((s) => s.auth.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    // Review-service expects: productId, userId, rating, body (camelCase). Optional: title, categoryId, subcategoryId, year.
    const payload = {
      title: title.trim(),
      categoryId: categoryId || undefined,
      subcategoryId: hasSubcategories && subcategoryId ? subcategoryId : undefined,
      productId: hasProducts && productId ? productId : undefined,
      userId: user?.id ?? undefined,
      year: showYear && year ? parseInt(year, 10) : undefined,
      rating: rating || undefined,
      body: body.trim(),
    }
    setSubmitted(true)
    const result = await dispatch(createReviewAsync(payload))
    if (createReviewAsync.fulfilled.match(result)) {
      setTitle('')
      setBody('')
      setRating(5)
      setSubcategoryId('')
      setProductId('')
      setYear('')
      navigate('/reviews')
    }
    setSubmitted(false)
  }

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ fontStyle: 'italic' }} gutterBottom>
        Write a review
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Share your experience with others.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryId}
              label="Category"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {hasSubcategories && (
            <FormControl fullWidth>
              <InputLabel>{subcategoryLabel}</InputLabel>
              <Select
                value={subcategoryId}
                label={subcategoryLabel}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select (optional)</em>
                </MenuItem>
                {subcategories.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {hasProducts && (
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={productId}
                label="Product"
                onChange={(e) => setProductId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select (optional)</em>
                </MenuItem>
                {products.map((prod) => (
                  <MenuItem key={prod.id} value={prod.id}>
                    {prod.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {showYear && (
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select (optional)</em>
                </MenuItem>
                {Array.from({ length: (new Date().getFullYear() + 2) - 2015 }, (_, i) => 2015 + i)
                  .reverse()
                  .map((y) => (
                    <MenuItem key={y} value={String(y)}>
                      {y}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          <TextField
            label="Title"
            placeholder={categoryId === 'company' ? 'e.g. Google Vietnam — work culture' : 'e.g. 2024 Toyota Camry — great daily driver'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <Box>
            <Typography component="legend" variant="body2" sx={{ mb: 0.5 }}>
              Rating (1–5)
            </Typography>
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v ?? 5)}
              size="large"
            />
          </Box>

          <TextField
            label="Your review"
            placeholder="Describe your experience: pros, cons, would you recommend?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            fullWidth
            multiline
            rows={6}
          />

          {error && (
            <FormHelperText error>{error}</FormHelperText>
          )}

          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button type="submit" variant="contained" disabled={submitted}>
              {submitted ? 'Publishing…' : 'Publish review'}
            </Button>
            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
