import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredReviews } from '../store/reviewsSlice'
import { setFilterCategory } from '../store/reviewsSlice'
import { useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'
import './Category.css'

function Category() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const category = categories.find((c) => c.slug === slug)
  const reviews = useSelector(selectFilteredReviews)

  useEffect(() => {
    if (category) dispatch(setFilterCategory(category.id))
    return () => dispatch(setFilterCategory(null))
  }, [category, dispatch])

  if (!category) {
    return (
      <div className="category-page">
        <p>Category not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="category-page">
      <div className="category-hero">
        <span className="category-hero-icon">{category.icon}</span>
        <h1 className="category-hero-title">{category.name}</h1>
        <p className="category-hero-desc">{category.description}</p>
        <Link to={`/write/${category.slug}`} className="btn btn-primary">
          Write a review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>No reviews in this category yet. Share your experience!</p>
          <Link to={`/write/${category.slug}`} className="btn btn-secondary">
            Write a review
          </Link>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Category
