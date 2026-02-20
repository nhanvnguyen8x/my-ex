import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createReviewAsync } from '../store/reviewsSlice'
import { selectSubcategoriesByCategoryId } from '../store/categoriesSlice'
import '../styles/pages/WriteReview.css'

function WriteReview() {
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
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const error = useSelector((s) => s.reviews.error)

  const subcategories = useSelector((s) => selectSubcategoriesByCategoryId(s, categoryId))
  const hasSubcategories = subcategories.length > 0

  const handleCategoryChange = (newCategoryId) => {
    setCategoryId(newCategoryId)
    setSubcategoryId('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    const payload = {
      title: title.trim(),
      categoryId: categoryId || undefined,
      subcategoryId: hasSubcategories && subcategoryId ? subcategoryId : undefined,
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
      navigate('/reviews')
    }
    setSubmitted(false)
  }

  return (
    <div className="write-review-page">
      <h1 className="page-title">Write a review</h1>
      <p className="page-subtitle">Share your experience with others.</p>

      <form className="review-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Category
        </label>
        <select
          className="form-select"
          value={categoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        {hasSubcategories && (
          <>
            <label className="form-label">
              Subcategory
            </label>
            <select
              className="form-select"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
            >
              <option value="">Select (optional)</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </>
        )}

        <label className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. 2024 Toyota Camry — great daily driver"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="form-label">
          Rating (1–5)
        </label>
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`rating-star ${n <= rating ? 'filled' : ''}`}
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} stars`}
            >
              ★
            </button>
          ))}
        </div>

        <label className="form-label">
          Your review
        </label>
        <textarea
          className="form-textarea"
          placeholder="Describe your experience: pros, cons, would you recommend?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />

        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitted}>
            {submitted ? 'Publishing…' : 'Publish review'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default WriteReview
