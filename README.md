# Experience Review Platform

A React + Redux web app for writing and browsing reviews across categories like Cars, Laptops, Phones, Travel, Restaurants, and Electronics.

## Features

- **Browse by category** — Cars, Laptops, Phones, Travel, Restaurants, Electronics
- **Write reviews** — Title, category, 1–5 star rating, and full review text
- **My Reviews** — View all your reviews with filter by category and sort (newest, oldest, rating)
- **Persistent storage** — Reviews are saved in `localStorage` (no backend required)

## Tech Stack

- **React 18** + **Vite**
- **Redux Toolkit** — state (reviews, categories, filters/sort)
- **React Router** — navigation

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Project Structure

```
src/
  components/   Layout, ReviewCard
  pages/        Home, Category, WriteReview, MyReviews
  store/        Redux store, reviewsSlice, categoriesSlice
  main.jsx, App.jsx, index.css
```
