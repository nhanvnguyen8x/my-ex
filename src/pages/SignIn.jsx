import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  FormHelperText,
} from '@mui/material'
import { loginAsync, clearError } from '../store/authSlice'

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((s) => s.auth.error)
  const loading = useSelector((s) => s.auth.loading)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(loginAsync({ username, password }))
  }

  const user = useSelector((s) => s.auth.user)
  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  if (user) return null

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', pt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontStyle: 'italic' }} gutterBottom>
        Sign in
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Sign in to your account.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            autoComplete="username"
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="current-password"
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </Stack>
      </Box>

      <Typography sx={{ mt: 3, textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/signup">
          Sign up
        </Link>
      </Typography>
    </Box>
  )
}
