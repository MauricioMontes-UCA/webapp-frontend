import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home'
import Login from './pages/Login/Login'
import PageResults from './pages/SearchPage/PageResults'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<PageResults />} />
      </Routes>
    </Router>
  )
}

export default App;
