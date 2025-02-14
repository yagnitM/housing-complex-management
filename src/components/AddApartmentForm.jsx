import React, { useState } from 'react';
import './AddApartmentForm.css';

const AddApartmentForm = () => {
  const [apartmentData, setApartmentData] = useState({
    name: '',
    type: '',
    size: '',
    rooms: '',
    price: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartmentData({
      ...apartmentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log('Apartment data submitted:', apartmentData);
    // Here, you would typically send the data to your backend API
  };

  return (
    <div className="add-apartment-container">
      <h2>Add New Apartment</h2>
      <form onSubmit={handleSubmit} className="add-apartment-form">
        <label htmlFor="name">Apartment Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={apartmentData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Apartment Type</label>
        <select
          id="type"
          name="type"
          value={apartmentData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Studio">Studio</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="Penthouse">Penthouse</option>
        </select>

        <label htmlFor="size">Size (sq. ft.)</label>
        <input
          type="number"
          id="size"
          name="size"
          value={apartmentData.size}
          onChange={handleChange}
          required
        />

        <label htmlFor="rooms">Number of Rooms</label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          value={apartmentData.rooms}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={apartmentData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={apartmentData.location}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">Add Apartment</button>
      </form>
    </div>
  );
};

export default AddApartmentForm;
