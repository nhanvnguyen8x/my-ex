# API layer

All HTTP calls go through `client.js` (axios). **Set `VITE_API_URL` to your backend base URL.** The app is API-only (no localStorage). The client sends `Authorization: Bearer <token>` when the user is logged in (token is kept in memory; session is lost on page refresh).

## Auth (auth.js)

| Operation   | Method | Endpoint          | Description                                                                 |
|-------------|--------|-------------------|-----------------------------------------------------------------------------|
| **Sign in** | POST   | `/auth/login`     | Body: `{ username, password }`. Returns `{ user: { id?, username }, token? }`. |
| **Sign up** | POST   | `/auth/register`  | Body: `{ username, password }`. Returns `{ user: { id?, username }, token? }`. |
| **Sign out**| POST   | `/auth/logout`    | Optional; invalidates session. Client clears token and user state.         |

## Reviews (reviews.js)

| Operation   | Method | Endpoint        | Description                                                                 |
|-------------|--------|-----------------|-----------------------------------------------------------------------------|
| **Get all** | GET    | `/reviews`      | Returns `Review[]`                                                          |
| **Get by id** | GET  | `/reviews/:id`  | Returns one `Review`                                                        |
| **Publish** | POST   | `/reviews`      | Body: `{ title, categoryId?, subcategoryId?, productId?, year?, rating?, body }`. Returns created `Review`. |
| **Delete**  | DELETE | `/reviews/:id`  | Deletes the review                                                          |

## Categories (categories.js) – optional (master-data-service)

| Operation    | Method | Endpoint                          | Description           |
|-------------|--------|-----------------------------------|-----------------------|
| **Get all** | GET    | `/categories`                     | Returns `Category[]`  |
| **Get by id** | GET  | `/categories/:id`                 | Returns one `Category` |
| **Subcategories** | GET | `/categories/:id/subcategories` or `GET /subcategories?categoryId=...` | Returns `Subcategory[]` |
| **Products** | GET  | `/subcategories/:id/products` or `GET /products?subcategoryId=...`     | Returns `Product[]`   |

Category APIs are optional; the app uses static Redux data for categories when the backend does not provide them.
