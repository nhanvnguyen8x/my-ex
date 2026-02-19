import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredReviews, setFilterCategory, setSortBy } from '../store/reviewsSlice'
import { Link } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import '../styles/pages/MyReviews.css'

function MyReviews() {
  const dispatch = useDispatch()
  const reviews = useSelector(selectFilteredReviews)
  const filterCategory = useSelector((s) => s.reviews.filterCategory)
  const sortBy = useSelector((s) => s.reviews.sortBy)
  const categories = useSelector((s) => s.categories.list)

  return (
    <div className="my-reviews-page">
      <h1 className="page-title">My reviews</h1>
      <p className="page-subtitle">All your submitted reviews in one place.</p>

      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            className="form-select filter-select"
            value={filterCategory ?? ''}
            onChange={(e) =>
              dispatch(setFilterCategory(e.target.value || null))
            }
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Sort</label>
          <select
            className="form-select filter-select"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="rating_high">Rating: high to low</option>
            <option value="rating_low">Rating: low to high</option>
          </select>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>You haven't written any reviews yet.</p>
          <Link to="/write" className="btn btn-primary">Write your first review</Link>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showCategory />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyReviews
