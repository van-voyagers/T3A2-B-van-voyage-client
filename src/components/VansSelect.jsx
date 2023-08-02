import { useEffect, useContext } from "react";
import axios from "axios";

function VansSelect({ onVansLoaded }) {
  // Determine the API URL based on the running environment (production or development)
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // This useEffect hook is responsible for fetching the van data as soon as the component mounts
  useEffect(() => {
    // Fetch the vans data and pass it to the callback function (onVansLoaded) once the data is loaded
    fetchVans().then(onVansLoaded);
  }, []);

  const fetchVans = async () => {
    // This function is responsible for fetching the vans data from the backend
    try {
      // Send a GET request to the server to fetch the vans data
      const res = await axios.get(`${API_URL}/bookings/vans`);
      // Return the vans data received from the server
      return res.data;
    } catch (error) {
      // Log any error occurred during fetching the vans data
      console.error("Error fetching vans:", error);
      // Return an empty array in case of any error
      return [];
    }
  };

  // The component does not render anything to the UI, hence it returns null
  return null;
}

export default VansSelect;
