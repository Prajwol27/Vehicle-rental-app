import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <section className="hero-container">
      <div className="hero-text">
        <h1>
          Find, book, <br /> rent a vehicle— <br />
          <span className="highlight">quick and super easy!</span>
        </h1>
        <p>
          Streamline your rental experience with our effortless booking process.
        </p>
        <button
          className="explore-button"
          aria-label="Explore available vehicles"
          onClick={() => navigate("/vehicles")} 
        >
          Explore Vehicles
        </button>
      </div>

  
      <div className="hero-image-container"></div>
    </section>
  );
};


export default Home;