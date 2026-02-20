import { configureStore } from '@reduxjs/toolkit'
import reviewsReducer from './reviewsSlice'
import categoriesReducer from './categoriesSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    categories: categoriesReducer,
    auth: authReducer,
  },
})
