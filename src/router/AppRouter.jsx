import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from "../pages/Home/Homepage.jsx"
import Login from '../pages/Login/Login.jsx'
import MainPage from '../pages/MainPage/MainPage.jsx'
import PrivateRoute from './PrivateRoute.jsx'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter


