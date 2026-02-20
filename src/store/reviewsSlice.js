import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as reviewsApi from '../api/reviews'

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
  filterSubcategoryId: null,
  sortBy: 'newest',
  loading: false,
  error: null,
}

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const data = await reviewsApi.getReviews()
      if (data != null) return data
      return loadReviews()
    } catch (err) {
      return rejectWithValue(err.response?.data ?? err.message)
    }
  }
)

export const createReviewAsync = createAsyncThunk(
  'reviews/createReviewAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const created = await reviewsApi.createReview(payload)
      if (created != null) return created
      return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...payload,
      }
    } catch (err) {
      return rejectWithValue(err.response?.data ?? err.message)
    }
  }
)

export const deleteReviewAsync = createAsyncThunk(
  'reviews/deleteReviewAsync',
  async (id, { rejectWithValue }) => {
    try {
      await reviewsApi.deleteReviewById(id)
    } catch (err) {
      return rejectWithValue(err.response?.data ?? err.message)
    }
    return id
  }
)

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
      state.filterSubcategoryId = null
    },
    setFilterSubcategory: (state, action) => {
      state.filterSubcategoryId = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.length >= 0) state.items = action.payload
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Failed to load reviews'
      })
      .addCase(createReviewAsync.fulfilled, (state, action) => {
        if (action.payload && !state.items.some((r) => r.id === action.payload.id)) {
          state.items.unshift(action.payload)
          saveReviews(state.items)
        }
      })
      .addCase(createReviewAsync.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to create review'
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = state.items.filter((r) => r.id !== action.payload)
          saveReviews(state.items)
        }
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to delete review'
      })
  },
})

export const { addReview, deleteReview, setFilterCategory, setFilterSubcategory, setSortBy, clearError } =
  reviewsSlice.actions

export const selectFilteredReviews = (state) => {
  const { items, filterCategory, filterSubcategoryId, sortBy } = state.reviews
  let list = filterCategory
    ? items.filter((r) => r.categoryId === filterCategory)
    : [...items]
  if (filterSubcategoryId) {
    list = list.filter((r) => r.subcategoryId === filterSubcategoryId)
  }

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
