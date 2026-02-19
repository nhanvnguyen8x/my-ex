import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Category from './pages/Category'
import WriteReview from './pages/WriteReview'
import MyReviews from './pages/MyReviews'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/write" element={<WriteReview />} />
        <Route path="/write/:categorySlug" element={<WriteReview />} />
        <Route path="/reviews" element={<MyReviews />} />
      </Routes>
    </Layout>
  )
}

export default App
