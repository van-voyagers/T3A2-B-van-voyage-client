import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'

function BookingHistory() {
  // States to store bookings data
  const [bookings, setBookings] = useState([]); // All bookings
  const [upcomingBookings, setUpcomingBookings] = useState([]); // Upcoming bookings
  const [previousBookings, setPreviousBookings] = useState([]); // Previous bookings

  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  useEffect(() => {
    // Fetch user bookings when the component mounts
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to the login page if the user is not logged in
          return;
        }

        // Send a GET request to the server to fetch user bookings
        const response = await axios.get(`${API_URL}/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data); // Set all bookings to the state

        // Separate upcoming and previous bookings
        const today = new Date();
        const upcoming = [];
        const previous = [];
        response.data.forEach((booking) => {
          if (new Date(booking.endDate) >= today) {
            upcoming.push(booking);
          } else {
            previous.push(booking);
          }
        });

        setUpcomingBookings(upcoming); // Set upcoming bookings to the state
        setPreviousBookings(previous); // Set previous bookings to the state
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings(); // Call the function to fetch user bookings
  }, []);

  useEffect(() => {
    // Separate bookings into previous and upcoming arrays based on their end dates
    const today = new Date();
    const upcoming = bookings.filter(
      (booking) => new Date(booking.startDate) > today
    ); // Filter bookings with start date greater than current date
    const previous = bookings.filter(
      (booking) => new Date(booking.startDate) <= today
    ); // Filter bookings with start date less than or equal to current date

    // Update the states with filtered arrays
    setUpcomingBookings(upcoming); // Set upcoming bookings to the state
    setPreviousBookings(previous); // Set previous bookings to the state
  }, [bookings]);

  // Function to calculate the number of days between two dates
  function calculateNumberOfDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.round(Math.abs((start - end) / oneDay)) + 1; // Calculate the difference in days and add 1 to include both start and end days
    return diffDays; // Return the number of days
  }

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to the login page if the user is not logged in
        return;
      }

      // Make a DELETE request to the server to delete the booking with the given bookingId
      await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted booking from the state
      const updatedBookings = bookings.filter(
        (booking) => booking._id !== bookingId
      );
      setBookings(updatedBookings); // Update the state with the filtered bookings array

      // Show an alert to notify the user that the booking was cancelled
      toast.info("Booking cancelled");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="flex flex-col p-8 px-5 font-mono items-center text-voyage-black leading-8">
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <h2 className="text-md font-roboto text-center">UPCOMING BOOKINGS</h2>
        {upcomingBookings.length === 0 ? (
          <p className="py-8 text-center">No upcoming bookings found.</p>
        ) : (
          <ul>
            {upcomingBookings.map((booking) => (
              <li
                key={booking._id}
                className="text-voyage-black shadow-xl border border-voyage-black rounded-lg my-16 py-8 px-16"
              >
                <p className="py-4">
                  <strong>Van:</strong> {booking.van.vanName}
                </p>
                <p>
                  <strong>Start date:</strong>{" "}
                  {new Date(booking.startDate).toDateString()}
                </p>
                <p>
                  <strong>End date:</strong>{" "}
                  {new Date(booking.endDate).toDateString()}
                </p>
                <p>
                  <strong>No. of Days:</strong>{" "}
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
      <div className="max-w-screen-sm w-full text-voyage-black lg:max-w-screen-md">
        <h2 className="text-md font-roboto my-8 text-center">
          PREVIOUS BOOKINGS
        </h2>
        {previousBookings.length === 0 ? (
          <p className="py-8 text-center">No previous bookings found.</p>
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
                  <strong>Start date:</strong>{" "}
                  {new Date(booking.startDate).toDateString()}
                </p>
                <p>
                  <strong>End date:</strong>{" "}
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
  );
}

export default BookingHistory;
