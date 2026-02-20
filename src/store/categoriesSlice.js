import { createSlice } from '@reduxjs/toolkit'

const subcategoriesByCategory = {
  cars: [
    { id: 'cars-toyota', name: 'Toyota', slug: 'toyota', categoryId: 'cars' },
    { id: 'cars-hyundai', name: 'Hyundai', slug: 'hyundai', categoryId: 'cars' },
    { id: 'cars-bmw', name: 'BMW', slug: 'bmw', categoryId: 'cars' },
    { id: 'cars-honda', name: 'Honda', slug: 'honda', categoryId: 'cars' },
    { id: 'cars-ford', name: 'Ford', slug: 'ford', categoryId: 'cars' },
  ],
  laptops: [
    { id: 'laptops-apple', name: 'Apple', slug: 'apple', categoryId: 'laptops' },
    { id: 'laptops-dell', name: 'Dell', slug: 'dell', categoryId: 'laptops' },
    { id: 'laptops-hp', name: 'HP', slug: 'hp', categoryId: 'laptops' },
    { id: 'laptops-lenovo', name: 'Lenovo', slug: 'lenovo', categoryId: 'laptops' },
    { id: 'laptops-asus', name: 'Asus', slug: 'asus', categoryId: 'laptops' },
  ],
  phones: [
    { id: 'phones-apple', name: 'Apple', slug: 'apple', categoryId: 'phones' },
    { id: 'phones-samsung', name: 'Samsung', slug: 'samsung', categoryId: 'phones' },
    { id: 'phones-google', name: 'Google', slug: 'google', categoryId: 'phones' },
    { id: 'phones-oneplus', name: 'OnePlus', slug: 'oneplus', categoryId: 'phones' },
    { id: 'phones-xiaomi', name: 'Xiaomi', slug: 'xiaomi', categoryId: 'phones' },
  ],
  travel: [
    { id: 'travel-beach', name: 'Beach', slug: 'beach', categoryId: 'travel' },
    { id: 'travel-city', name: 'City', slug: 'city', categoryId: 'travel' },
    { id: 'travel-adventure', name: 'Adventure', slug: 'adventure', categoryId: 'travel' },
  ],
  restaurants: [
    { id: 'restaurants-italian', name: 'Italian', slug: 'italian', categoryId: 'restaurants' },
    { id: 'restaurants-japanese', name: 'Japanese', slug: 'japanese', categoryId: 'restaurants' },
    { id: 'restaurants-vietnamese', name: 'Vietnamese', slug: 'vietnamese', categoryId: 'restaurants' },
  ],
  electronics: [
    { id: 'electronics-headphones', name: 'Headphones', slug: 'headphones', categoryId: 'electronics' },
    { id: 'electronics-cameras', name: 'Cameras', slug: 'cameras', categoryId: 'electronics' },
    { id: 'electronics-tvs', name: 'TVs', slug: 'tvs', categoryId: 'electronics' },
  ],
  food: [
    { id: 'food-street', name: 'Street food', slug: 'street-food', categoryId: 'food' },
    { id: 'food-fast', name: 'Fast food', slug: 'fast-food', categoryId: 'food' },
    { id: 'food-vietnamese', name: 'Vietnamese', slug: 'vietnamese', categoryId: 'food' },
    { id: 'food-asian', name: 'Asian', slug: 'asian', categoryId: 'food' },
    { id: 'food-western', name: 'Western', slug: 'western', categoryId: 'food' },
    { id: 'food-desserts', name: 'Desserts', slug: 'desserts', categoryId: 'food' },
  ],
  drink: [
    { id: 'drink-tiger', name: 'Tiger Beer', slug: 'tiger-beer', categoryId: 'drink' },
    { id: 'drink-corona', name: 'Corona', slug: 'corona', categoryId: 'drink' },
    { id: 'drink-heineken', name: 'Heineken', slug: 'heineken', categoryId: 'drink' },
    { id: 'drink-sapporo', name: 'Sapporo', slug: 'sapporo', categoryId: 'drink' },
    { id: 'drink-craft', name: 'Craft beer', slug: 'craft-beer', categoryId: 'drink' },
    { id: 'drink-coffee', name: 'Coffee', slug: 'coffee', categoryId: 'drink' },
    { id: 'drink-bubble-tea', name: 'Bubble tea', slug: 'bubble-tea', categoryId: 'drink' },
  ],
}

const initialState = {
  list: [
    { id: 'cars', name: 'Cars', slug: 'cars', icon: '🚗', description: 'Vehicle reviews and experiences' },
    { id: 'laptops', name: 'Laptops', slug: 'laptops', icon: '💻', description: 'Laptop and computer reviews' },
    { id: 'phones', name: 'Phones', slug: 'phones', icon: '📱', description: 'Smartphone reviews' },
    { id: 'travel', name: 'Travel', slug: 'travel', icon: '✈️', description: 'Destinations and travel experiences' },
    { id: 'restaurants', name: 'Restaurants', slug: 'restaurants', icon: '🍽️', description: 'Dining and food reviews' },
    { id: 'electronics', name: 'Electronics', slug: 'electronics', icon: '🔌', description: 'Gadgets and electronics' },
    { id: 'food', name: 'Food', slug: 'food', icon: '🍳', description: 'Food experiences and dishes' },
    { id: 'drink', name: 'Drink', slug: 'drink', icon: '🍺', description: 'Beers, coffee, and beverages' },
  ],
  subcategories: Object.values(subcategoriesByCategory).flat(),
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

export const selectSubcategoriesByCategoryId = (state, categoryId) =>
  state.categories.subcategories.filter((s) => s.categoryId === categoryId)

export default categoriesSlice.reducer
