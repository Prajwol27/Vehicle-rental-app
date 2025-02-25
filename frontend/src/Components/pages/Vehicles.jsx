import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicles.css';

const Vehicles = () => {
  return (
    <div className="vehicles-container">
      <h1 className="vehicles-title">Vehicles</h1>
      <div className="box-container">
        <div className="box">
          <div className="image car-image"></div>
          <h2>Car</h2>
          <Link to="/Cars">
          <button className="rent-btn">Rent Now</button>
          </Link>
        </div>
        <div className="box">
          <div className="image bike-image"></div>
          <h2>Bike</h2>
          <Link to="/Bikes">
          <button className="rent-btn">Rent Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
