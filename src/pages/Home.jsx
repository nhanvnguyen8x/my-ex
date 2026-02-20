import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Link,
} from '@mui/material'
import { selectFilteredReviews } from '../store/reviewsSlice'
import { selectSubcategoriesByCategoryId } from '../store/categoriesSlice'
import ReviewCard from '../components/ReviewCard'

function CategoryCard({ category }) {
  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, category.id))
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea component={RouterLink} to={`/category/${category.slug}`} sx={{ height: '100%', p: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 1, fontSize: { xs: '2.5rem', sm: '3rem' } }}>
            {category.icon}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {category.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: subcategories.length ? 1 : 0 }}>
            {category.description}
          </Typography>
          {subcategories.length > 0 && (
            <Typography variant="body2" color="text.secondary" display="block">
              {subcategories.map((s) => s.name).join(', ')}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function Home() {
  const categories = useSelector((s) => s.categories.list)
  const reviews = useSelector(selectFilteredReviews)
  const recentReviews = reviews.slice(0, 6)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontStyle: 'italic' }}>
          Share your experience
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 480, mx: 'auto', mb: 2 }}>
          Review cars, laptops, travel, restaurants, and more. Your voice helps others decide.
        </Typography>
        <Button component={RouterLink} to="/write" variant="contained" size="large">
          Write a review
        </Button>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Browse by category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={4} key={cat.id}>
              <CategoryCard category={cat} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Typography variant="h6">Recent reviews</Typography>
          <Link component={RouterLink} to="/reviews" color="primary" underline="hover">
            View all
          </Link>
        </Box>
        {recentReviews.length === 0 ? (
          <Card variant="outlined" sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No reviews yet. Be the first to share your experience.
            </Typography>
            <Button component={RouterLink} to="/write" variant="outlined">
              Write a review
            </Button>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showCategory showSubcategory showProduct />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
