import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css'
import Navbar from './components/NavBar';
import Testimonial from './components/Testimonal';
import HeroSection from './components/HeroSection';
import WorkingSteps from './components/WorkingSteps';
import Footer from './components/Footer';
import BottomFooter from './components/BottomFooter';
import FeaturedParkingSpots from './components/FeaturedParkingSpots';
import AdminDashboard from './pages/AdminDashboard';
import AddVehicle from './pages/AddVehicle';
import ManageVehicles from './pages/ManageVehicles';
import HomePage from './pages/HomePage';
import VehicleDetails from './pages/VehicleDetail';
import UserLoginPage from './pages/UserLoginPage';
import UserSignupPage from './pages/UserSignUpPage';
import UserProfilePage from './pages/UserProfile';
import AddParkingLot from './pages/AddParkingLot';
import ManageParkingLots from './pages/ManageParkingLots';
import ParkingLotDetails from './pages/ParkingLotDetails';
import MyBookings from './pages/MyBookings';
import AdminLoginPage from './pages/AdminLoginPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/userlogin" element={<UserLoginPage/>}/> */}
        <Route path="/usersignup" element={<UserSignupPage/>}/>
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path = "/parking-lot/:id" element={<ParkingLotDetails/>}/>
        <Route path="/my-bookings" element={<MyBookings />} />


        {/* Logins */}
        <Route path="/userlogin" element={<UserLoginPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/add-vehicle" element={<ProtectedRoute><AddVehicle/></ProtectedRoute>}/>
        <Route path="/admin/create-parking" element={<AddParkingLot/>}/>
        <Route path="/admin/manage-parkinglot" element={<ManageParkingLots/>}/>
        <Route path="/admin/manage-vehicles" element={<ManageVehicles/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>

        {/* Protected User RoutesX` */}
        <Route path="/user/:id" element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>} />
        
      </Routes>
    </>
  )
}

export default App
