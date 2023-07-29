import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BookingHistory() {
  const [bookings, setBookings] = useState([])

  const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          // Redirect to login page if the user is not logged in
          // Implement your own logic for handling unauthenticated users
          return
        }

        const response = await axios.get(
          `${API_URL}/bookings/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      

      setBookings(response.data);
    } catch (error) {
        console.error('Error fetching user bookings:', error)
      }
    }

    fetchUserBookings()
  }, [])

  return (
    <div className="flex justify-center p-8 px-5">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul >
          {bookings.map((booking) => (
            <li key={booking._id} className="text-voyage-black shadow-xl border border-voyage-black rounded-lg mb-8 p-8 mx-auto max-w-prose font-mono leading-8">


              <p>Van: {booking.van.vanName}</p>
              <p>Start date: {new Date(booking.startDate).toDateString()}</p>
              <p>End date: {new Date(booking.endDate).toDateString()}</p>
              <p>Total Price: ${booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;






