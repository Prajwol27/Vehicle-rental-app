import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles'); 
        console.log('API Response:', response.data); 

        const filteredCars = response.data.filter(
          (vehicle) => vehicle.type.toLowerCase() === 'car'
        );
        console.log('Filtered Cars:', filteredCars); 
        setCars(filteredCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleBooking = (carId) => {
    navigate(`/book-vehicle/${carId}`);
  };
  

  return (
    <div className="car-rental">
      <h1>Available Cars</h1>
      <div className="car-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="car-item">
              <img
                src={`http://localhost:8080/uploads/${car.image}`}
                alt={car.model}
                className="car-image"
              />
              <div className="car-details">
                <h3>{car.model}</h3>
                <p>Rs {car.pricePerDay} / day</p>
              </div>
              <button className="book-btn" onClick={() => handleBooking(car._id)}>
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default Cars;