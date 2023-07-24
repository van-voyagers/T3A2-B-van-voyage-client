// VansSelect.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VansSelect({ onVanSelect }) {
  const [vans, setVans] = useState([]);
  
  useEffect(() => {
    // call API endpoint to fetch vans data
    fetchVans().then(setVans);
  }, []);
  
  const fetchVans = async () => {
    try {
      const res = await axios.get('http://localhost:3000/bookings/vans');
      return res.data;
    } catch (error) {
      console.error('Error fetching vans:', error)
      return [];
    }
  }
  
  const handleVanSelect = (event) => {
    const selectedVan = vans.find(van => van._id === event.target.value)
    onVanSelect(selectedVan);
  }

  return (
    <select onChange={handleVanSelect}>
      <option value="">Select a van</option>
      {vans.map((van) => (
        <option key={van._id} value={van._id}>
          {van.vanName}
        </option>
      ))}
    </select>
  );
}

export default VansSelect;
