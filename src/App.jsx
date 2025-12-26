import React from 'react'
import ContactManager from './components/ContactManager.jsx'
import LandingPage from './components/LandingPage.jsx'
import {Route, Routes} from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contact-manager' element={<ContactManager />} />
      </Routes>
    </div>
  )
}

export default App
