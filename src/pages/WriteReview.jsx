import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addReview } from '../store/reviewsSlice'
import './WriteReview.css'

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
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    dispatch(
      addReview({
        title: title.trim(),
        categoryId: categoryId || undefined,
        rating: rating || undefined,
        body: body.trim(),
      })
    )
    setSubmitted(true)
    setTitle('')
    setBody('')
    setRating(5)
    setTimeout(() => {
      setSubmitted(false)
      navigate('/reviews')
    }, 1500)
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
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitted}>
            {submitted ? 'Published!' : 'Publish review'}
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
