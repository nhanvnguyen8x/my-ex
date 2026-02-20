import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Rating,
  Box,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { deleteReviewAsync } from '../store/reviewsSlice'

export default function ReviewCard({ review, showCategory = false, showSubcategory = false, showProduct = false }) {
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const subcategories = useSelector((s) => s.categories.subcategories)
  const products = useSelector((s) => s.categories.products)
  const category = categories.find((c) => c.id === review.categoryId)
  const subcategory = review.subcategoryId
    ? subcategories.find((s) => s.id === review.subcategoryId)
    : null
  const product = review.productId
    ? products.find((p) => p.id === review.productId)
    : null

  const handleDelete = () => {
    if (window.confirm('Delete this review?')) dispatch(deleteReviewAsync(review.id))
  }

  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <Card variant="outlined" sx={{ '&:hover': { borderColor: 'primary.light' } }}>
      <CardHeader
        action={
          <IconButton
            aria-label="Delete review"
            onClick={handleDelete}
            size="small"
            color="inherit"
            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        }
        subheader={
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {showCategory && category && (
              <Typography variant="body2" color="text.secondary">
                {category.icon} {category.name}
                {showSubcategory && subcategory && ` · ${subcategory.name}`}
                {showProduct && product && ` · ${product.name}`}
                {review.year && ` · ${review.year}`}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
        }
        subheaderTypographyProps={{ component: 'div' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {review.title}
        </Typography>
        {review.rating != null && (
          <Rating
            value={review.rating}
            readOnly
            size="small"
            sx={{ mb: 0.5 }}
            aria-label={`Rating: ${review.rating} out of 5`}
          />
        )}
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          {review.body}
        </Typography>
      </CardContent>
    </Card>
  )
}
