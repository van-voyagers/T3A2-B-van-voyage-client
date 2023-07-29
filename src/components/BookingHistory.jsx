import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function BookingHistory() {
  const [bookings, setBookings] = useState([])
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [previousBookings, setPreviousBookings] = useState([])

  const API_URL =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          // Redirect to login page if the user is not logged in
          // Implement your own logic for handling unauthenticated users
          return
        }

        const response = await axios.get(`${API_URL}/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setBookings(response.data)
      } catch (error) {
        console.error('Error fetching user bookings:', error)
      }
    }

    fetchUserBookings()
  }, [])

  useEffect(() => {
    // Separate bookings into previous and upcoming arrays based on their end dates
    const today = new Date()
    const upcoming = bookings.filter(
      (booking) => new Date(booking.startDate) > today
    )
    const previous = bookings.filter(
      (booking) => new Date(booking.startDate) <= today
    )

    setUpcomingBookings(upcoming)
    setPreviousBookings(previous)
  }, [bookings])

  function calculateNumberOfDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000 // One day in milliseconds
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffDays = Math.round(Math.abs((start - end) / oneDay)) + 1 // Add 1 to include both start and end days
    return diffDays
  }

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        // Redirect to login page if the user is not logged in
        // Implement your own logic for handling unauthenticated users
        return
      }

      await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Show alert for "Booking cancelled"
      alert('Booking cancelled')
      
      // After successful deletion, fetch the updated bookings
      location.reload()
      
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  return (
    <div className="flex flex-col p-8 px-5 font-mono border items-center leading-8">
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <h2 className="text-xl font-mono my-8">Upcoming Bookings:</h2>
        {upcomingBookings.length === 0 ? (
          <p className="py-8">No upcoming bookings found.</p>
        ) : (
          <ul>
            {upcomingBookings.map((booking) => (
              <li
                key={booking._id}
                className="text-voyage-black shadow-xl border border-voyage-black rounded-lg my-16 py-8 px-16"
              >
                {/*<p>
                  <strong>Booking Confirmed:</strong> (license boolean?)
            </p>*/}
                <p className="py-4">
                  <strong>Van:</strong> {booking.van.vanName}
                </p>
                <p>
                  <strong>Start date:</strong>{' '}
                  {new Date(booking.startDate).toDateString()}
                </p>
                <p>
                  <strong>End date:</strong>{' '}
                  {new Date(booking.endDate).toDateString()}
                </p>
                <p>
                  <strong>No. of Days:</strong>{' '}
                  {calculateNumberOfDays(booking.startDate, booking.endDate)}
                </p>
                <p>
                  <strong>Price / Day:</strong> {booking.van.pricePerDay}
                </p>
                <p className="py-4">
                  <strong>Total Cost:</strong> ${booking.totalPrice}
                </p>
                <p className="py-8 italic">
                  IF YOU WOULD LIKE TO MAKE ADJUSTMENTS TO YOUR BOOKING PLEASE
                  SEND US A MESSAGE VIA THE CONTACT FORM
                </p>
                <button
                  className="text-red-700 underline mt-10"
                  onClick={() => handleDeleteBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <h2 className="text-xl font-mono my-8">Previous Bookings:</h2>
        {previousBookings.length === 0 ? (
          <p className="py-8">No previous bookings found.</p>
        ) : (
          <ul>
            {previousBookings.map((booking) => (
              <li
                key={booking._id}
                className="text-voyage-black shadow-xl border border-voyage-black rounded-lg my-16 py-8 px-16"
              >
                <p className="py-4">
                  <strong>Van:</strong> {booking.van.vanName}
                </p>
                <p>
                  <strong>Start date:</strong>{' '}
                  {new Date(booking.startDate).toDateString()}
                </p>
                <p>
                  <strong>End date:</strong>{' '}
                  {new Date(booking.endDate).toDateString()}
                </p>
                <p className="py-4">
                  <strong>Total Price:</strong> ${booking.totalPrice}
                </p>
                <p className="mt-10">
                  {new Date(booking.endDate) >= new Date() ? (
                    <span className="text-cyan-700">TRIP IN PROGRESS</span>
                  ) : (
                    <span className="text-green-700">PAID AND COMPLETE</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BookingHistory
