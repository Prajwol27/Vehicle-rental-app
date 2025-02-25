import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; 
import './AdminPage.css';



const AdminPage = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    type: 'bike',
    model: '',
    pricePerDay: '',
    available: true,
    image: null,
    existingImage: null,
  });

  const [vehiclesList, setVehiclesList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState(null);

  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles');
        setVehiclesList(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleFileChange = (e) => {
    setVehicle((prevState) => ({
      ...prevState,
      image: e.target.files[0],
      existingImage: null,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', vehicle.type);
    formData.append('model', vehicle.model);
    formData.append('pricePerDay', vehicle.pricePerDay);
    formData.append('available', vehicle.available);
    if (vehicle.image) {
      formData.append('image', vehicle.image);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:8080/api/vehicles/${editVehicleId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setVehiclesList((prev) =>
          prev.map((v) => (v._id === response.data._id ? response.data : v))
        );
      } else {
        response = await axios.post(
          'http://localhost:8080/api/vehicles',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setVehiclesList((prev) => [...prev, response.data]);
      }

      
      setVehicle({
        type: 'bike',
        model: '',
        pricePerDay: '',
        available: true,
        image: null,
        existingImage: null,
      });
      setIsEditing(false);
      setEditVehicleId(null);
    } catch (error) {
      console.error('Error submitting vehicle:', error);
    }
  };

  
  const handleEdit = (vehicleToEdit) => {
    setIsEditing(true);
    setEditVehicleId(vehicleToEdit._id);
    setVehicle({
      type: vehicleToEdit.type,
      model: vehicleToEdit.model,
      pricePerDay: vehicleToEdit.pricePerDay,
      available: vehicleToEdit.available,
      image: null,
      existingImage: vehicleToEdit.image,
    });
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${id}`);
      setVehiclesList((prev) => prev.filter((v) => v._id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h1 className="form-title">{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h1>
        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-grid">
            <div className="input-group">
              <label>Vehicle Type</label>
              <select
                name="type"
                value={vehicle.type}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="bike">Bike</option>
                <option value="car">Car</option>
              </select>
            </div>

            <div className="input-group">
              <label>Model Name</label>
              <input
                type="text"
                name="model"
                value={vehicle.model}
                onChange={handleChange}
                placeholder="Enter model name"
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <label>Price Per Day (Rs)</label>
              <input
                type="number"
                name="pricePerDay"
                value={vehicle.pricePerDay}
                onChange={handleChange}
                placeholder="Enter daily price"
                className="form-input"
                required
                min="0"
              />
            </div>

            <div className="input-group">
              <label>Vehicle Image</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="file-input"
                  accept="image/*"
                />
                <span className="file-custom">
                  {vehicle.image ? vehicle.image.name : 'Choose file...'}
                </span>
              </div>
            </div>
          </div>

          {vehicle.existingImage && !vehicle.image && (
            <div className="image-preview">
              <img
                src={`http://localhost:8080/uploads/${vehicle.existingImage}`}
                alt="Current vehicle"
                className="preview-image"
              />
            </div>
          )}

          <button type="submit" className="btn btn-submit">
            {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
      </div>

      <div className="vehicle-list">
        <h2 className="list-title">Manage Vehicles</h2>
        <div className="vehicle-grid">
          {vehiclesList.map((v) => (
            <div key={v._id} className="vehicle-card">
              <div className="card-image">
                {v.image && (
                  <img
                    src={`http://localhost:8080/uploads/${v.image}`}
                    alt={v.model}
                    className="vehicle-image"
                  />
                )}
              </div>
              <div className="card-content">
                <h3 className="vehicle-model">{v.model}</h3>
                <p className="vehicle-price">Rs{v.pricePerDay}/day</p>
                <div className="vehicle-type">{v.type}</div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(v)} className="btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(v._id)} className="btn btn-delete">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
