import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home'
import Login from './pages/Login/Login'
import './App.css'
import Signup from './pages/Signup/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App;
