import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import Homepage from './pages/Home'
import Login from './pages/Login/Login'
import Description from './pages/Books-page/Description'

import Header from './components/Header/Header'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/description"
          element={
            <>
              <Header />
              <Description />
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
