import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewForm() {
  // Set initial state values for rating, comment, and bookingId
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [bookingId, setBookingId] = useState(null);

  // Determine the API URL based on the mode of operation
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // Create a static array for star rating
  const stars = Array(5).fill(0);

  useEffect(() => {
    // Define a function to retrieve the token from local storage
    function getAuthToken() {
      return localStorage.getItem("token");
    }

    // Retrieve the auth token
    const authToken = getAuthToken();

    // If an auth token exists, fetch user's bookings
    if (authToken) {
      axios
        .get(`${API_URL}/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          // If the user has at least one booking, store the first booking's ID
          if (response.data.length > 0) {
            setBookingId(response.data[0]._id);
          }
        })
        .catch((error) =>
          console.error("Error fetching user bookings:", error)
        );
    }
  }, []);

  // Handle star click for rating input
  const handleStarClick = (i) => {
    setRating(i + 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Define a function to retrieve the token from local storage
    function getAuthToken() {
      return localStorage.getItem("token");
    }

    // Retrieve the auth token
    const authToken = getAuthToken();

    // If no auth token exists, alert the user to log in
    if (!authToken) {
      alert(
        "You must be logged in to post a review. Please log in and try again."
      );
      return;
    }

    // If no booking ID exists, alert the user to make a booking
    if (!bookingId) {
      alert("You must have at least one booking to post a review.");
      return;
    }

    // Define review object
    const review = {
      booking: bookingId,
      rating,
      comment,
    };

    // Make a POST request to create the review
    axios
      .post(`${API_URL}/reviews/create`, review, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        alert("Review successfully posted!");
        setComment("");
        setRating(0);
      })
      .catch((error) => {
        console.error("Error posting review:", error);
        alert("Failed to post review. Please try again later.");
      });
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <form
          className="flex flex-col px-5 space-y-4 text-voyage-black"
          onSubmit={handleSubmit}
        >
          <div className="w-full space-y-4">
            <div className="flex space-x-1 cursor-pointer">
              {stars.map((_, i) => {
                const star = i < rating ? "★" : "☆";
                return (
                  <span onClick={() => handleStarClick(i)} key={i}>
                    {star}
                  </span>
                );
              })}
            </div>

            <textarea
              id="review"
              name="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Review..."
              className="w-full h-40 pl-2 pt-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />
          </div>
          <div className="self-start">
            <button
              type="submit"
              className="bg-voyage-green shadow-lg text-white font-roboto mb-20 font-light rounded px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
