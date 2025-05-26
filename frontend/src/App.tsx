
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import LandingPage from './Pages/LandingPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path = '/homepage' element = {<LandingPage />} />
    </Routes>
  )
}

export default App
