import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Bikes.css';

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles'); 
        console.log('API Response:', response.data);

        const filteredBikes = response.data.filter(
          (vehicle) => vehicle.type.toLowerCase() === 'bike'
        );
        console.log('Filtered Bikes:', filteredBikes); 

        setBikes(filteredBikes);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };

    fetchBikes();
  }, []);

  const handleBooking = (bikeId) => {
    navigate(`/book-vehicle/${bikeId}`);
  };
  

  return (
    <div className="bike-rental">
      <h1>Available Bikes</h1>
      <div className="bike-list">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <div key={bike._id} className="bike-item">
              <img
                src={`http://localhost:8080/uploads/${bike.image}`}
                alt={bike.model}
                className="bike-image"
              />
              <div className="bike-details">
                <h3>{bike.model}</h3>
                <p>Rs {bike.pricePerDay} / day</p>
              </div>
              <button className="book-btn" onClick={() => handleBooking(bike._id)}>
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No bikes available</p>
        )}
      </div>
    </div>
  );
};

export default Bikes;