import { useSelector, useDispatch } from 'react-redux'
import { deleteReviewAsync } from '../store/reviewsSlice'
import '../styles/components/ReviewCard.css'

function ReviewCard({ review, showCategory = false, showSubcategory = false }) {
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const subcategories = useSelector((s) => s.categories.subcategories)
  const category = categories.find((c) => c.id === review.categoryId)
  const subcategory = review.subcategoryId
    ? subcategories.find((s) => s.id === review.subcategoryId)
    : null

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm('Delete this review?')) dispatch(deleteReviewAsync(review.id))
  }

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < (review.rating || 0) ? 'star filled' : 'star'}>
      ★
    </span>
  ))

  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <article className="review-card">
      <div className="review-card-header">
        <div className="review-meta">
          {showCategory && category && (
            <span className="review-category">
              {category.icon} {category.name}
              {showSubcategory && subcategory && (
                <span className="review-subcategory"> · {subcategory.name}</span>
              )}
            </span>
          )}
          <span className="review-date">{date}</span>
        </div>
        <button type="button" className="review-delete" onClick={handleDelete} aria-label="Delete review">
          ×
        </button>
      </div>
      <h3 className="review-title">{review.title}</h3>
      {review.rating != null && (
        <div className="review-rating" aria-label={`Rating: ${review.rating} out of 5`}>
          {stars}
        </div>
      )}
      <p className="review-body">{review.body}</p>
    </article>
  )
}

export default ReviewCard
