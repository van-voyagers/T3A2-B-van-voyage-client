import React, { useState, useEffect } from "react";
import axios from "axios";

function PersonalDetails() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: "",
    driversLicense: "",
  });

  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero based
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="px-5">
      <div className="text-voyage-black font-mono border border-voyage-black shadow-xl space-y-4 rounded-lg p-8 mx-auto max-w-prose">
        <p>
          <strong>First Name: </strong>
          {user.firstName || ""}
        </p>
        <p>
          <strong>Last Name: </strong>
          {user.lastName || ""}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {formatDate(user.dob)}
        </p>
        <p>
          <strong>Email: </strong>
          {user.email || ""}
        </p>
        <p>
          <strong>Phone Number: </strong>
          {user.phoneNumber || ""}
        </p>
        <p>
          <strong>Address: </strong>
          {user.address || ""}
        </p>
        <p>
          <strong>Driver's License: </strong>
          {user.driversLicense || ""}
        </p>
      </div>
    </div>
  );
}

export default PersonalDetails;
