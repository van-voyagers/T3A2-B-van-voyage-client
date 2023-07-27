import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonalDetails() {
  const [user, setUser] = useState({
    name: '',
    dob: '',
    email: '',
    address: '',
    driversLicense: '',
    phoneNumber: '', // Added phoneNumber field
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // replace with your token retrieval logic
      const result = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
    };

    fetchData();
  }, []);

  // Function to format the date in the form 'DD-MM-YYYY'
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero based
    const year = d.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="text-voyage-black font-roboto-mono border border-voyage-black shadow-xl rounded-lg p-8 mx-auto max-w-prose">
      <h1 className="text-center mb-4">Personal Details</h1>
      <p>
        <strong>Name: </strong>
        {user.name}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {formatDate(user.dob)}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <p>
        <strong>Address: </strong>
        {user.address}
      </p>
      <p>
        <strong>Driver's License: </strong>
        {user.driversLicense}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {user.phoneNumber}  {/* Display phone number */}
      </p>
    </div>
  );
}

export default PersonalDetails;




