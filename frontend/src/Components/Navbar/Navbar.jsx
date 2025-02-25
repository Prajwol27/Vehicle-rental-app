import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import Button from './Button';
import { useAuth } from '../pages/loginsignupadmin/AuthContext';
import './Dropdown2.css';

function Navbar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth(); 
  const [dropdown, setDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth > 960) {
      setDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 960) {
      setDropdown(false);
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Urban Rides
      </Link>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-links">Home</Link>
        </li>
        <li className="nav-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/vehicles" className="nav-links">
            Vehicles <i className="fas fa-caret-down"></i>
          </Link>
          {dropdown && <Dropdown />}
        </li>
        <li className="nav-item">
          <Link to="/about-us" className="nav-links">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact-us" className="nav-links">Contact Us</Link>
        </li>

        
        {!isAuthenticated ? (
          <li className="nav-item">
            <Link to="/log-in" className="nav-links-mobile">Login</Link>
          </li>
        ) : (
          <li className="nav-item profile-menu" onClick={toggleProfileDropdown}>
            <span className="nav-links">
              <i className="fas fa-user"></i> {isAdmin ? "Admin" : user?.name}
            </span>
            {profileDropdown && (
              <ul className="profile-dropdown">
                {isAdmin && <li><Link to="/my-orders">Orders</Link></li>} 
                {isAdmin && <li><Link to="/admin">Admin</Link></li>} 
                <li onClick={logout}>Logout</li>
              </ul>
            )}
          </li>
        )}
      </ul>

      {!isAuthenticated && <Button />} 
    </nav>
  );
}

export default Navbar;
