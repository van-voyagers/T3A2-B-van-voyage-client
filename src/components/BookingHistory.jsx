import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BookingHistory() {
  const [bookings, setBookings] = useState([])

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
          'http://localhost:3000/bookings/my-bookings',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch van details for each booking (this part can be kept as is)
      const bookingsWithVanDetails = await Promise.all(
        response.data.map(async (booking) => {
          const vanResponse = await axios.get(`http://localhost:3000/bookings/van/${booking.van._id}`);
          const vanName = vanResponse.data.vanName;
          return { ...booking, vanName };
        })
      );

      setBookings(bookingsWithVanDetails);
    } catch (error) {
        console.error('Error fetching user bookings:', error)
      }
    }

    fetchUserBookings()
  }, [])

  return (
    <div className="flex justify-center p-8">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul >
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Van: {booking.vanName}</p>
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






