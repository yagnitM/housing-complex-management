import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddApartmentForm.css";
import { FaHome, FaRulerCombined, FaBed, FaMoneyBillWave, 
         FaMapMarkerAlt, FaBuilding, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";

const AddApartmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [societies, setSocieties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Get the society data from location state
  const societyFromRedirect = location.state || null;

  // State to manage multiple apartment forms
  const [apartmentForms, setApartmentForms] = useState([]);

  // Initialize apartment forms based on society data when component mounts
  useEffect(() => {
    if (societyFromRedirect) {
      const initialApartmentForms = [];
      
      // Generate forms based on the number of apartments in each type
      const apartmentTypes = [
        { type: 'Studio', count: societyFromRedirect.studioApartments || 0 },
        { type: '1BHK', count: societyFromRedirect.oneBHKApartments || 0 },
        { type: '2BHK', count: societyFromRedirect.twoBHKApartments || 0 },
        { type: '3BHK', count: societyFromRedirect.threeBHKApartments || 0 },
        { type: 'Penthouse', count: societyFromRedirect.penthouseApartments || 0 }
      ];

      apartmentTypes.forEach(({ type, count }) => {
        for (let i = 1; i <= count; i++) {
          initialApartmentForms.push({
            societyId: societyFromRedirect.societyId,
            type: type,
            name: `${type} - ${i}`,
            size: '',
            roomCount: type === 'Studio' ? 1 : parseInt(type.charAt(0)),
            price: '',
            description: '',
            status: 'Available',
            features: {
              Balcony: false,
              AirConditioning: false,
              ModularKitchen: false,
              PowerBackup: false
            },
            images: []
          });
        }
      });

      setApartmentForms(initialApartmentForms);
    }
  }, [societyFromRedirect]);

  const validateForm = () => {
    const errors = {};
    
    // Validate each apartment form
    apartmentForms.forEach((apartment, index) => {
      if (!apartment.size) errors[`size-${index}`] = "Size is required";
      if (!apartment.price) errors[`price-${index}`] = "Price is required";
    });
    
    return errors;
  };

  const handleApartmentChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    
    const updatedApartmentForms = [...apartmentForms];
    
    if (name.startsWith('feature-')) {
      const featureName = name.replace('feature-', '');
      updatedApartmentForms[index].features[featureName] = checked;
    } else {
      updatedApartmentForms[index][name] = value;
    }
    
    setApartmentForms(updatedApartmentForms);
    
    // Clear specific field error
    if (formErrors[`${name}-${index}`]) {
      const newErrors = {...formErrors};
      delete newErrors[`${name}-${index}`];
      setFormErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Submit all apartments
      const responses = await Promise.all(
        apartmentForms.map(apartment => 
          axios.post("http://localhost:6060/api/apartments", apartment)
        )
      );
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'success-notification';
      notification.textContent = `${responses.length} Apartments Added Successfully!`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
        navigate("/admin-dashboard");
      }, 2000);
      
    } catch (error) {
      console.error("Error adding apartments:", error);
      setFormErrors({submit: "Failed to add apartments. Please try again."});
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!societyFromRedirect) {
    return <div>No society data found. Please go back and select a society.</div>;
  }

  return (
    <div className="form-page-container">
      <div className="navigation-bar">
        <button 
          type="button" 
          className="back-nav-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      
      <div className="add-apartment-container">
        <div className="form-header">
          <h2><FaHome className="header-icon" /> Add Apartments for {societyFromRedirect.societyName}</h2>
          <p>Fill in details for {apartmentForms.length} apartments</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {apartmentForms.map((apartment, index) => (
            <div key={index} className="apartment-form-section">
              <h3>{apartment.type} Apartment - {apartment.name}</h3>
              
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor={`size-${index}`}>
                      <FaRulerCombined className="input-icon" /> Size (sq. ft.)
                    </label>
                    <input 
                      type="number" 
                      id={`size-${index}`} 
                      name="size" 
                      value={apartment.size} 
                      onChange={(e) => handleApartmentChange(index, e)}
                      placeholder="Area in sq. ft."
                      className={formErrors[`size-${index}`] ? "error" : ""}
                    />
                    {formErrors[`size-${index}`] && 
                      <div className="error-message">{formErrors[`size-${index}`]}</div>}
                  </div>
                  
                  <div className="form-group half-width">
                    <label htmlFor={`price-${index}`}>
                      <FaMoneyBillWave className="input-icon" /> Price (₹)
                    </label>
                    <input 
                      type="number" 
                      id={`price-${index}`} 
                      name="price" 
                      value={apartment.price} 
                      onChange={(e) => handleApartmentChange(index, e)}
                      placeholder="Monthly rent amount"
                      className={formErrors[`price-${index}`] ? "error" : ""}
                    />
                    {formErrors[`price-${index}`] && 
                      <div className="error-message">{formErrors[`price-${index}`]}</div>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`description-${index}`}>
                    Description (Optional)
                  </label>
                  <textarea 
                    id={`description-${index}`} 
                    name="description" 
                    value={apartment.description} 
                    onChange={(e) => handleApartmentChange(index, e)}
                    placeholder={`Add details about ${apartment.type} apartment...`}
                    rows="3"
                  />
                </div>

                <div className="form-section">
                  <h4>Features</h4>
                  <div className="features-container">
                    {Object.keys(apartment.features).map(feature => (
                      <div key={feature} className="feature-card">
                        <input 
                          type="checkbox" 
                          id={`feature-${feature}-${index}`} 
                          name={`feature-${feature}`} 
                          checked={apartment.features[feature]} 
                          onChange={(e) => handleApartmentChange(index, e)} 
                        />
                        <label htmlFor={`feature-${feature}-${index}`}>
                          <div className="feature-text">{feature.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {formErrors.submit && <div className="error-message form-error">{formErrors.submit}</div>}
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? `Adding ${apartmentForms.length} Apartments...` : `Add ${apartmentForms.length} Apartments`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApartmentForm;