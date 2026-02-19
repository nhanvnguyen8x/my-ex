import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [
    { id: 'cars', name: 'Cars', slug: 'cars', icon: '🚗', description: 'Vehicle reviews and experiences' },
    { id: 'laptops', name: 'Laptops', slug: 'laptops', icon: '💻', description: 'Laptop and computer reviews' },
    { id: 'phones', name: 'Phones', slug: 'phones', icon: '📱', description: 'Smartphone reviews' },
    { id: 'travel', name: 'Travel', slug: 'travel', icon: '✈️', description: 'Destinations and travel experiences' },
    { id: 'restaurants', name: 'Restaurants', slug: 'restaurants', icon: '🍽️', description: 'Dining and food reviews' },
    { id: 'electronics', name: 'Electronics', slug: 'electronics', icon: '🔌', description: 'Gadgets and electronics' },
  ],
  selectedCategoryId: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload
    },
    clearSelectedCategory: (state) => {
      state.selectedCategoryId = null
    },
  },
})

export const { setSelectedCategory, clearSelectedCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
