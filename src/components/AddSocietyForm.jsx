import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection
import axios from "axios"; // Import axios for API requests
import "./AddSocietyForm.css";

const AddSocietyForm = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
    rooms: {
      "1BHK": { count: 0, price: 0 },
      "2BHK": { count: 0, price: 0 },
      "3BHK": { count: 0, price: 0 },
    },
    facilities: {
      Parking: false,
      Gymnasium: false,
      Security: false,
      Pool: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.rooms) {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [name]: { ...prev.rooms[name], price: Number(value) },
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        facilities: { ...prev.facilities, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6060/api/societies", formData);
      alert("Society Added Successfully!");
      navigate("/add-apartment"); // Redirect to AddApartmentForm.jsx
    } catch (error) {
      console.error("Error adding society:", error);
      alert("Failed to add society. Please try again.");
    }
  };

  return (
    <div className="add-society-container">
      <h2>Add New Society</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Society Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Location (Google Maps URL):
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>

        <h3>Room Details</h3>
        {Object.keys(formData.rooms).map((roomType) => (
          <div key={roomType} className="room-entry">
            <label>{roomType} Count:</label>
            <input
              type="number"
              name={roomType}
              value={formData.rooms[roomType].count}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  rooms: {
                    ...prev.rooms,
                    [roomType]: { ...prev.rooms[roomType], count: Number(e.target.value) },
                  },
                }))
              }
            />
            <label>Price:</label>
            <input type="number" name={roomType} value={formData.rooms[roomType].price} onChange={handleChange} />
          </div>
        ))}

        <h3>Facilities</h3>
        <div className="facilities-container">
          {Object.keys(formData.facilities).map((facility) => (
            <div key={facility} className="facility-card">
              <input type="checkbox" id={facility} name={facility} checked={formData.facilities[facility]} onChange={handleChange} />
              <label htmlFor={facility}>{facility}</label>
            </div>
          ))}
        </div>

        <button type="submit">Add Society</button>
      </form>
    </div>
  );
};

export default AddSocietyForm;
