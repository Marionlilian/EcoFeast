import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import AdminDashboard from './admin/AdminDashboard'
import NonprofitDashboard from './Ngo/NonprofitDashboard'
import UserDashboard from './userdash/UserDashboard'
import Home from './Home'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/Ngo/NonprofitDashboard" element={<NonprofitDashboard />} />
      <Route path="/userdash/UserDashboard" element={<UserDashboard />} />
      <Route path='/Home' element={<Home/>}/>

      
      <Route path="/" element={<Navigate to="/Home" />} />
    </Routes>
  );
}
export default App
