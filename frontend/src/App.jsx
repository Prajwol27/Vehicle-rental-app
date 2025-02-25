import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Components/pages/loginsignupadmin/AuthContext.jsx';

import Aboutus from './Components/pages/Aboutus';
import Bikes from './Components/pages/Bikes';
import Cars from './Components/pages/Cars';
import Contact from './Components/pages/Contact';
import Home from './Components/pages/Home';
import Login from './Components/pages/loginsignupadmin/Login.jsx';
import Vehicles from './Components/pages/Vehicles';
import Signup from './Components/pages/loginsignupadmin/Signup.jsx';
import AdminPage from './Components/pages/loginsignupadmin/AdminPage.jsx';
import BookingPage from './Components/pages/Booking.jsx';
import Orders from './Components/pages/Orders.jsx';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/log-in" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/log-in" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/my-orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
          <Route path="/book-vehicle/:vehicleId" element={<BookingPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
