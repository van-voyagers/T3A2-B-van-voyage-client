import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import StarRatings from "react-star-ratings";

const ReviewCarousel = () => {
  // Initialize state to hold reviews
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Define API_URL based on the mode
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  useEffect(() => {
    // fetch reviews when the component mounts
    const fetchReviews = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching reviews
        // Make GET request to fetch all reviews
        const res = await axios.get(`${API_URL}/reviews/all`);
        // Update state with fetched reviews
        setReviews(res.data);
        setLoading(false); // Set loading state to false after fetching reviews
      } catch (err) {
        // Log any error that occurs during fetching the reviews
        console.error(err);
        setLoading(false); // Set loading state to false even if an error occurred
      }
    };
    // Call the function to fetch reviews
    fetchReviews();
  }, []);

  // Define styles for arrow buttons in the carousel
  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    color: "#2D2D2D", // voyage-black
  };

  return (
    <div className="text-center">
      <h2 className="text-sm lg:text-xl text-voyage-black font-mono py-4 my-6">
        REVIEWS
      </h2>
      {loading ? (
        <div className="flex justify-center items-center pb-14">
          <img
            src="/loading-gif.gif"
            alt="...LOADING..."
            style={{ width: "60px", height: "60px" }}
          />
        </div>
      ) : reviews.length ? (
        <div>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            interval={2000}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <div
                  style={{ ...arrowStyles, left: 15 }}
                  onClick={onClickHandler}
                  title={label}
                >
                  &#10094;
                </div>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <div
                  style={{ ...arrowStyles, right: 15 }}
                  onClick={onClickHandler}
                  title={label}
                >
                  &#10095;
                </div>
              )
            }
          >
            {reviews.map((review) => {
              if (review.booking && review.booking.user) {
                return (
                  <div
                    key={review._id}
                    className="text-voyage-black font-mono text-sm lg:text-lg px-16 mb-4"
                  >
                    <h3 className="mb-2">{review.booking.user.firstName}</h3>
                    <p className="mb-2 overflow-hidden break-words">
                      "{review.comment}"
                    </p>
                    <StarRatings
                      rating={review.rating}
                      starDimension="20px"
                      starSpacing="5px"
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </Carousel>
          <p className="text-center text-voyage-black my-4 sm:my-6 font-mono">
            ° ° °
          </p>
        </div>
      ) : (
        <p className="text-voyage-black mb-10 font-mono">No Reviews Found</p>
      )}
    </div>
  );
};

export default ReviewCarousel;
