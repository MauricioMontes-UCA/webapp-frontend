import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage/Homepage'
import Login from '../pages/Login/Login'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default AppRouter


