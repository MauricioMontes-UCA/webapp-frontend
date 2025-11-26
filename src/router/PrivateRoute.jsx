import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import API from '../utils/api'

const BASE_URI = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true
    const checkAuth = async () => {
      try {
        const res = await API.get('/api/auth/')
        if (!mounted) return
        setIsAuthenticated(res.status === 200)
      }
      catch (err) {
        if (!mounted) return
        setIsAuthenticated(false)
      }
      finally {
        if (mounted) setLoading(false)
      }
    }

    checkAuth()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return null
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'

//   return isAuthenticated ? children : <Navigate to="/login" replace />
// }

export default PrivateRoute
