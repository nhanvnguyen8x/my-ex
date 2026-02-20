import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFilteredReviews } from '../store/reviewsSlice'
import { selectSubcategoriesByCategoryId } from '../store/categoriesSlice'
import ReviewCard from '../components/ReviewCard'
import '../styles/pages/Home.css'

function Home() {
  const categories = useSelector((s) => s.categories.list)
  const reviews = useSelector(selectFilteredReviews)
  const recentReviews = reviews.slice(0, 6)

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Share your experience</h1>
        <p className="hero-subtitle">
          Review cars, laptops, travel, restaurants, and more. Your voice helps others decide.
        </p>
        <Link to="/write" className="btn btn-primary">
          Write a review
        </Link>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Browse by category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recent reviews</h2>
          <Link to="/reviews" className="link-muted">View all</Link>
        </div>
        {recentReviews.length === 0 ? (
          <div className="empty-state">
            <p>No reviews yet. Be the first to share your experience.</p>
            <Link to="/write" className="btn btn-secondary">Write a review</Link>
          </div>
        ) : (
          <div className="reviews-list">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showCategory showSubcategory />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function CategoryCard({ category }) {
  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, category.id))
  return (
    <Link
      to={`/category/${category.slug}`}
      className="category-card"
    >
      <span className="category-icon">{category.icon}</span>
      <span className="category-name">{category.name}</span>
      <span className="category-desc">{category.description}</span>
      {subcategories.length > 0 && (
        <span className="category-sublist">
          {subcategories.map((s) => s.name).join(', ')}
        </span>
      )}
    </Link>
  )
}

export default Home
