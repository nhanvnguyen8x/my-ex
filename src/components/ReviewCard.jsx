import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteReview } from '../store/reviewsSlice'
import './ReviewCard.css'

function ReviewCard({ review, showCategory = false }) {
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const category = categories.find((c) => c.id === review.categoryId)

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm('Delete this review?')) dispatch(deleteReview(review.id))
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
            <span className="review-category">{category.icon} {category.name}</span>
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
