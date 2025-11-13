import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home'
import Login from './pages/Login/Login'
import MainPage from './pages/MainPage/MainPage'
import MyLibrary from './pages/MyLibrary'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/my-library" element={<MyLibrary />} />
      </Routes>
    </Router>
  )
}

export default App;
