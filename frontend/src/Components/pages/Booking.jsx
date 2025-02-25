import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './loginsignupadmin/AuthContext';
import './Booking.css';

const Booking = () => {
  const { bookingId, vehicleId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isTokenExpired } = useAuth();

  const [booking, setBooking] = useState({
    vehicleId: vehicleId || '',
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnLocation: '',
    returnDate: '',
    returnTime: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token || isTokenExpired(token)) {
      logout();
      navigate('/login');
      return;
    }
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [isAuthenticated, navigate, logout, isTokenExpired, bookingId]);

  const fetchBookingDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      alert('Failed to fetch booking details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token || isTokenExpired(token)) {
      alert('Session expired. Please log in again.');
      logout();
      navigate('/login');
      return;
    }
    try {
      if (bookingId) {
        await axios.put(`http://localhost:8080/api/bookings/${bookingId}`, booking, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Booking updated!');
      } else {
        await axios.post('http://localhost:8080/api/bookings', booking, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Booking created!');
      }
      navigate('/my-orders');
    } catch (error) {
      console.error('Booking error:', error.response?.data || error.message);
      alert(`Booking failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="booking-form">
      <h2>{bookingId ? 'Update Booking' : 'Book Vehicle'}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Vehicle ID:
            <input type="text" name="vehicleId" value={booking.vehicleId} onChange={handleChange} required disabled={!!vehicleId} />
          </label>
          <label>Pickup Location:
            <input type="text" name="pickupLocation" value={booking.pickupLocation} onChange={handleChange} required />
          </label>
          <label>Pickup Date:
            <input type="date" name="pickupDate" value={booking.pickupDate} onChange={handleChange} required />
          </label>
          <label>Pickup Time:
            <input type="time" name="pickupTime" value={booking.pickupTime} onChange={handleChange} required />
          </label>
          <label>Return Location:
            <input type="text" name="returnLocation" value={booking.returnLocation} onChange={handleChange} required />
          </label>
          <label>Return Date:
            <input type="date" name="returnDate" value={booking.returnDate} onChange={handleChange} required />
          </label>
          <label>Return Time:
            <input type="time" name="returnTime" value={booking.returnTime} onChange={handleChange} required />
          </label>
          <label>Phone Number:
            <input type="tel" name="phoneNumber" value={booking.phoneNumber} onChange={handleChange} required />
          </label>
          <button type="submit">{bookingId ? 'Update Booking' : 'Book Now'}</button>
        </form>
      )}
    </div>
  );
};

export default Booking;
