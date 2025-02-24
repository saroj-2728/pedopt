import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './components/home/home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import OfferPet from './components/adopt/OfferPet'
import Dashboard from './components/dashboard/Dashboard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/offer-pet' element={<OfferPet />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App