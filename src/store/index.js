import { configureStore } from '@reduxjs/toolkit'
import reviewsReducer from './reviewsSlice'
import categoriesReducer from './categoriesSlice'

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    categories: categoriesReducer,
  },
})
