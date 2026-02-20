import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button, Container,
} from '@mui/material'
import { logoutAsync } from '../store/authSlice'

export default function Layout({ children }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((s) => s.auth.user)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/write', label: 'Write Review' },
    { to: '/reviews', label: 'My Reviews' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { color: 'primary.dark' },
            }}
          >
            ◆ Our Experience
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {navItems.map(({ to, label }) => {
              const active =
                to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
              return (
                <Button
                  key={to}
                  component={RouterLink}
                  to={to}
                  color={active ? 'primary' : 'inherit'}
                  variant={active ? 'contained' : 'text'}
                  disableElevation
                  sx={{
                    ...(active && {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        color: 'primary.contrastText',
                      },
                    }),
                  }}
                >
                  {label}
                </Button>
              )
            })}
            {user ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  {user.username}
                </Typography>
                <Button color="inherit" onClick={() => dispatch(logoutAsync())}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/signin" color="inherit">
                  Sign in
                </Button>
                <Button component={RouterLink} to="/signup" variant="outlined" color="primary" size="small">
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="md">{children}</Container>
      </Box>
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        <span>Experience Review Platform</span>
        <span>Share your experiences.</span>
      </Box>
    </Box>
  )
}
