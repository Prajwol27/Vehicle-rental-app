import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './loginsignupadmin/AuthContext';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, isTokenExpired } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token || isTokenExpired(token)) {
      logout();
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, navigate, logout, isTokenExpired]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));
      alert('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="orders-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-info">
                <h3>Booking ID: {booking._id}</h3>
                <div>
                  <strong>Vehicle Details:</strong>
                  <p><strong>Type:</strong> {booking.vehicleId?.type}</p>
                  <p><strong>Model:</strong> {booking.vehicleId?.model}</p>
                  <p><strong>Price Per Day:</strong> Rs{booking.vehicleId?.pricePerDay}</p>
                  <p><strong>Available:</strong> {booking.vehicleId?.available ? 'Yes' : 'No'}</p>
                </div>
                <p><strong>Pickup:</strong> {new Date(booking.pickupDate).toLocaleDateString()} at {booking.pickupTime}</p>
                <p><strong>Return:</strong> {new Date(booking.returnDate).toLocaleDateString()} at {booking.returnTime}</p>
                <p><strong>Phone:</strong> {booking.phoneNumber}</p>
              </div>
              <div className="booking-actions">
                <button 
                  onClick={() => handleDelete(booking._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
