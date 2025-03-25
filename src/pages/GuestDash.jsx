import React, { useState, useEffect } from 'react';
import './GuestDash.css';
import { FaHome, FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const GuestDash = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'All'
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/public-properties');
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSignUpPrompt = () => {
    alert("Sign up to save properties and contact property owners!");
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = filters.minPrice === '' || property.price >= parseInt(filters.minPrice);
    const matchesMaxPrice = filters.maxPrice === '' || property.price <= parseInt(filters.maxPrice);
    const matchesBedrooms = filters.bedrooms === '' || property.bedrooms >= parseInt(filters.bedrooms);
    const matchesBathrooms = filters.bathrooms === '' || property.bathrooms >= parseInt(filters.bathrooms);
    const matchesPropertyType = filters.propertyType === 'All' || property.propertyType === filters.propertyType;
    
    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesBathrooms && matchesPropertyType;
  });

  return (
    <div className="guest-dashboard">
      <header className="guest-header">
        <div className="guest-logo">
          <FaHome className="guest-logo-icon" />
          <h1>PropertyFinder</h1>
        </div>
        <div className="guest-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by location or property name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="filter-button" onClick={toggleFilter}>
            <FaFilter /> Filter
          </button>
        </div>
        <div className="guest-auth-buttons">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </header>

      {filterOpen && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-inputs">
              <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} />
              <span>to</span>
              <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} />
            </div>
          </div>
          <div className="filter-group">
            <label>Bedrooms:</label>
            <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Bathrooms:</label>
            <select name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>
      )}

      <main className="guest-content">
        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : (
          <div className="property-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <div className="property-card" key={property.id}>
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <button className="favorite-button" onClick={handleSignUpPrompt}>♡</button>
                  </div>
                  <div className="property-details">
                    <h3>{property.title}</h3>
                    <div className="property-location"><MdLocationOn /> {property.location}</div>
                    <div className="property-price">${property.price}/month</div>
                    <div className="property-rating"><FaStar className="star-icon" /><span>{property.rating}</span></div>
                    <button className="view-details-button" onClick={handleSignUpPrompt}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-properties">
                <h3>No properties available yet.</h3>
                <p>Properties will appear here once added by administrators.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default GuestDash;