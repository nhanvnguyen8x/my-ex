import { Link, useLocation } from 'react-router-dom'
import '../styles/components/Layout.css'

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">Experience Review</span>
        </Link>
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/write" className={location.pathname.startsWith('/write') ? 'active' : ''}>Write Review</Link>
          <Link to="/reviews" className={location.pathname === '/reviews' ? 'active' : ''}>My Reviews</Link>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <span>Experience Review Platform</span>
        <span className="footer-muted">Share your experiences.</span>
      </footer>
    </div>
  )
}
