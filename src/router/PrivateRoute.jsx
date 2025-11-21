import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URI = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URI}/api/users/me`, { withCredentials: true })
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

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'

//   return isAuthenticated ? children : <Navigate to="/login" replace />
// }

export default PrivateRoute
