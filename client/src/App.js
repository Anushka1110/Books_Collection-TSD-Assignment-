import {Route, Routes} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Service from './components/Service'
import AboutUs from './components/AboutUs'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Routes>
    <Route  path="/login" element={<LoginForm/>} />
    <Route  path="/" element={<ProtectedRoute Component={Home}/>} />
    <Route  path="/service" element={<ProtectedRoute Component={Service}/>} />
    <Route  path="/aboutus" element={<ProtectedRoute Component={AboutUs}/>} />
    <Route  path="/signup" element={<SignUp/>} />
    <Route path="/*" element={<NotFound/>} />
  </Routes>
)

export default App
