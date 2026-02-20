import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as reviewsApi from '../api/reviews'

const initialState = {
  items: [],
  currentReview: null,
  filterCategory: null,
  filterSubcategoryId: null,
  filterProductId: null,
  filterYear: null,
  sortBy: 'newest',
  loading: false,
  error: null,
}

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const data = await reviewsApi.getReviews()
      return data ?? []
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
      return rejectWithValue('Failed to create review')
    } catch (err) {
      return rejectWithValue(err.response?.data ?? err.message)
    }
  }
)

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await reviewsApi.getReviewById(id)
      if (data != null) return data
      return rejectWithValue('Review not found')
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
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data ?? err.message)
    }
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
    },
    deleteReview: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload)
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload
      state.filterSubcategoryId = null
      state.filterProductId = null
      state.filterYear = null
    },
    setFilterSubcategory: (state, action) => {
      state.filterSubcategoryId = action.payload
      state.filterProductId = null
    },
    setFilterProduct: (state, action) => {
      state.filterProductId = action.payload
    },
    setFilterYear: (state, action) => {
      state.filterYear = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    clearCurrentReview: (state) => {
      state.currentReview = null
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
        }
      })
      .addCase(createReviewAsync.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to create review'
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = state.items.filter((r) => r.id !== action.payload)
        }
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to delete review'
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.currentReview = action.payload
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.currentReview = null
        state.error = action.payload ?? 'Failed to load review'
      })
  },
})

export const { addReview, deleteReview, setFilterCategory, setFilterSubcategory, setFilterProduct, setFilterYear, setSortBy, clearError, clearCurrentReview } =
  reviewsSlice.actions

export const selectCurrentReview = (state) => state.reviews.currentReview

export const selectFilteredReviews = (state) => {
  const { items, filterCategory, filterSubcategoryId, filterProductId, filterYear, sortBy } = state.reviews
  let list = filterCategory
    ? items.filter((r) => r.categoryId === filterCategory)
    : [...items]
  if (filterSubcategoryId) {
    list = list.filter((r) => r.subcategoryId === filterSubcategoryId)
  }
  if (filterProductId) {
    list = list.filter((r) => r.productId === filterProductId)
  }
  if (filterYear != null) {
    list = list.filter((r) => r.year === filterYear)
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
