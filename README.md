# Experience Review Platform

A React + Redux web app for writing and browsing reviews across categories like Cars, Laptops, Phones, Travel, Restaurants, and Electronics.

## Features

- **Browse by category** — Cars, Laptops, Phones, Travel, Restaurants, Electronics
- **Write reviews** — Title, category, 1–5 star rating, and full review text
- **My Reviews** — View all your reviews with filter by category and sort (newest, oldest, rating)
- **API or local** — When `VITE_API_URL` is set, reviews are loaded/saved via API; otherwise they use `localStorage`

## Tech Stack

- **React 18** + **Vite**
- **Redux Toolkit** — state (reviews, categories, filters/sort)
- **React Router** — navigation
- **Axios** — HTTP client for API calls

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Using a backend API

Create a `.env` file (see `.env.example`) and set:

```
VITE_API_URL=https://your-api.example.com
```

Expected endpoints:

- `GET /reviews` — returns `{ data: Review[] }` or `Review[]`
- `POST /reviews` — body `{ title, categoryId?, rating?, body }`, returns created `Review` (with `id`, `createdAt`)
- `DELETE /reviews/:id` — deletes the review

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Project Structure

```
src/
  api/          axios client (client.js), reviews API (reviews.js)
  components/   Layout.jsx, ReviewCard.jsx  (JSX only)
  pages/        Home.jsx, Category.jsx, WriteReview.jsx, MyReviews.jsx  (JSX only)
  styles/
    components/ Layout.css, ReviewCard.css
    pages/      Home.css, Category.css, WriteReview.css, MyReviews.css
  store/        Redux store, reviewsSlice, categoriesSlice
  main.jsx, App.jsx, index.css  (global styles)
```
