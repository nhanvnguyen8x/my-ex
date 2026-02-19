import { createSlice } from '@reduxjs/toolkit'

const loadReviews = () => {
  try {
    const saved = localStorage.getItem('experience-reviews')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveReviews = (reviews) => {
  localStorage.setItem('experience-reviews', JSON.stringify(reviews))
}

const initialState = {
  items: loadReviews(),
  filterCategory: null,
  sortBy: 'newest', // newest | oldest | rating_high | rating_low
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const review = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      }
      state.items.unshift(review)
      saveReviews(state.items)
    },
    deleteReview: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload)
      saveReviews(state.items)
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
  },
})

export const { addReview, deleteReview, setFilterCategory, setSortBy } = reviewsSlice.actions

export const selectFilteredReviews = (state) => {
  const { items, filterCategory, sortBy } = state.reviews
  let list = filterCategory
    ? items.filter((r) => r.categoryId === filterCategory)
    : [...items]

  const compare = (a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'rating_high':
        return (b.rating || 0) - (a.rating || 0)
      case 'rating_low':
        return (a.rating || 0) - (b.rating || 0)
      default:
        return 0
    }
  }
  return list.slice().sort(compare)
}

export default reviewsSlice.reducer
