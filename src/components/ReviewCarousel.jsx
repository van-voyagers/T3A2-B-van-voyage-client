import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import StarRatings from "react-star-ratings";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);

  // Define API_URL based on the mode
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  useEffect(() => {
    // fetch reviews when the component mounts
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/reviews/all`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

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
      <h2 className="text-sm lg:text-lg text-voyage-black font-roboto my-6 sm:my-8">
        REVIEWS
      </h2>
      {reviews.length ? (
        <div>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
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
            {reviews.map((review) => (
              <div
                key={review._id}
                className="text-voyage-black font-mono text-sm lg:text-lg px-16"
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
            ))}
          </Carousel>
          <p className="text-center text-voyage-black my-6 sm:my-8 font-mono">
            ° ° °
          </p>
        </div>
      ) : (
        <p className="text-voyage-black mb-10 font-mono">...LOADING...</p>
      )}
    </div>
  );
};

export default ReviewCarousel;

