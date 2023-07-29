import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;
  const stars = Array(5).fill(0); // create an array of 5 zeros to represent the stars

  useEffect(() => {
    // Helper function to get the authentication token from storage (local storage, session storage, etc.)
    function getAuthToken() {
      return localStorage.getItem("token"); // Use the correct key "token" to retrieve the authentication token
    }

    // Fetch the bookings of the current user when the component mounts
    const authToken = getAuthToken();
    if (authToken) {
      axios
        .get(`${API_URL}/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data.length > 0) {
            setBookingId(response.data[0]._id); // set the bookingId state to the id of the first booking
          }
        })
        .catch((error) =>
          console.error("Error fetching user bookings:", error)
        );
    }
  }, []);

  const handleStarClick = (i) => {
    setRating(i + 1); // update the rating when a star is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no bookingId, the user has no bookings and cannot post a review
    if (!bookingId) {
      alert("You must have at least one booking to post a review.");
      return;
    }

    const review = {
      booking: bookingId,
      rating,
      comment,
    };

    // Helper function to get the authentication token from storage (local storage, session storage, etc.)
    function getAuthToken() {
      return localStorage.getItem("token"); // Use the correct key "token" to retrieve the authentication token
    }

    const authToken = getAuthToken();
    if (!authToken) {
      alert("You must be logged in to post a review.");
      return;
    }

    axios
      .post(`${API_URL}/reviews/create`, review, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        alert("Review successfully posted!");
        setComment(""); // clear the comment
        setRating(0); // reset the rating
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

