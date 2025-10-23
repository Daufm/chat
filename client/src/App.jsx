import React from 'react'
import ChatInterface from './components/ChatInterface.jsx'
import LandingPage  from './components/LandingPage.jsx'
import AuthPage from './components/SignPage.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  )
}

export default App
