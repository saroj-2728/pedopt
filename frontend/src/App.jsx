import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './components/home/home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App