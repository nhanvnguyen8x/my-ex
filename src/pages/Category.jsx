import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredReviews, setFilterCategory, setFilterSubcategory } from '../store/reviewsSlice'
import { selectSubcategoriesByCategoryId } from '../store/categoriesSlice'
import { useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'
import '../styles/pages/Category.css'

function Category() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const categories = useSelector((s) => s.categories.list)
  const category = categories.find((c) => c.slug === slug)
  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, category?.id))
  const filterSubcategoryId = useSelector((s) => s.reviews.filterSubcategoryId)
  const reviews = useSelector(selectFilteredReviews)

  useEffect(() => {
    if (category) dispatch(setFilterCategory(category.id))
    return () => {
      dispatch(setFilterCategory(null))
      dispatch(setFilterSubcategory(null))
    }
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

      {subcategories.length > 0 && (
        <div className="subcategory-tabs">
          <button
            type="button"
            className={`subcategory-pill ${!filterSubcategoryId ? 'active' : ''}`}
            onClick={() => dispatch(setFilterSubcategory(null))}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              type="button"
              className={`subcategory-pill ${filterSubcategoryId === sub.id ? 'active' : ''}`}
              onClick={() => dispatch(setFilterSubcategory(sub.id))}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

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
            <ReviewCard key={review.id} review={review} showCategory showSubcategory />
          ))}
        </div>
      )}
    </div>
  )
}

export default Category
