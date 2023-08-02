import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "../Calendar.css";
import axios from "axios";
import VanDescriptions from "./VanDescriptions";

function BookingCalendar({ vanID, pricePerDay, vanName }) {
  // Initialize state variables to manage selected dates, booked dates, total price, and error messages
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState(null);

  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // Initialize state variable to store user details (may be used later in the component)
  const [userDetails, setUserDetails] = useState(null);

  // Define API_URL based on the mode (production or development)
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // Get the current date with the time set to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch the bookings for the specified van when the component mounts or vanID changes
  useEffect(() => {
    // Log a message to indicate that bookings for the van are being fetched
    console.log("Fetching bookings for van:", vanID);

    // Make a GET request to the API to fetch the bookings for the van
    axios
      .get(`${API_URL}/bookings/van/${vanID}`)
      .then((response) => {
        // Extract the bookings data from the response
        const bookings = response.data;

        // Extract the booked dates from the bookings data and create an array of date objects
        const dates = bookings.flatMap((booking) => {
          const start = new Date(booking.startDate);
          const end = new Date(booking.endDate);
          const dateArray = [];
          for (
            let date = start;
            date <= end;
            date.setDate(date.getDate() + 1)
          ) {
            dateArray.push(new Date(date));
          }
          return dateArray;
        });

        // Set the booked dates state with the array of booked dates
        setBookedDates(dates);
      })
      .catch((error) => {
        // Log an error and set the error state if there was a problem fetching the bookings
        console.error("Error fetching bookings:", error);
        setError("There was a problem fetching the booking data");
      });
  }, [vanID]);

  const handleDateChange = (date) => {
    // Calculate the timezone offset for the selected date
    const offset = date.getTimezoneOffset();

    // Adjust the selected date by subtracting the offset to get the local date
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);

    // Check if a start date is not yet selected
    if (!selectedStartDate) {
      // Set the selected start date with the adjusted date
      setSelectedStartDate(adjustedDate);
    } else if (!selectedEndDate && adjustedDate > selectedStartDate) {
      // Check if a start date is selected but the end date is not yet selected,
      // and ensure the selected end date is after the selected start date
      setSelectedEndDate(adjustedDate);
    } else {
      // If both start and end dates are already selected or the selected end date
      // is before the selected start date, reset both start and end dates
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  useEffect(() => {
    // When the selected start date changes, update the minimum value of the end date input
    // to ensure it is after the selected start date
    if (selectedStartDate) {
      document.getElementById("end-date-input").min = selectedStartDate
        .toISOString()
        .substring(0, 10);
    }
  }, [selectedStartDate]);

  useEffect(() => {
    // This function calculates the total price on the client side when the selected start and end dates change
    function calculateTotalPrice() {
      if (selectedStartDate && selectedEndDate) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(
          Math.abs((selectedEndDate - selectedStartDate) / oneDay + 1)
        );
        if (diffDays > 1) {
          // If date range is more than one day
          setTotalPrice(diffDays * pricePerDay);
        } else {
          setTotalPrice(null); // Force to null if date range is one day or less
        }
      } else {
        setTotalPrice(null); // Force to null if no date range is selected
      }
    }
    calculateTotalPrice();
  }, [selectedStartDate, selectedEndDate, pricePerDay]);

  function toLocalISOString(date) {
    // Calculate the timezone offset in minutes
    var tzo = -date.getTimezoneOffset(),
      // Determine the sign of the timezone offset
      dif = tzo >= 0 ? "+" : "-",
      // Define a function to pad a number with leading zeros
      pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
      };

    // Return a string representation of the date in the format "YYYY-MM-DDTHH:mm:ss+/-HH:mm"
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ":" +
      pad(tzo % 60)
    );
  }

  // useEffect hook with an empty dependency array, runs once when the component mounts
  useEffect(() => {
    // Define an async function to fetch user details
    const fetchUserDetails = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        // Make a GET request to fetch the user details using the token as Authorization header
        const response = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Set the user details in the component's state
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    // Call the fetchUserDetails function when the component mounts
    fetchUserDetails();
  }, []);

  // handleSubmit function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Check if token exists before making a booking
    if (!token) {
      // If token does not exist, show an alert to prompt the user to log in
      alert("Please log in to make a booking");
      // Navigate to the login page
      navigate("/login");
      return;
    }

    // Calculate the difference in days between selectedEndDate and selectedStartDate
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((selectedEndDate - selectedStartDate) / oneDay + 1)
    );
    console.log(diffDays);

    // Check if the booking is less than 2 days
    if (diffDays <= 2) {
      // If the booking is less than 2 days, show an alert to the user
      alert("A booking must be at least 3 days in duration.");
      return;
    }

    // Check if the booking is more than 21 days
    if (diffDays > 21) {
      // If the booking is more than 21 days, show an alert to the user
      alert(
        "A booking cannot exceed 3 weeks in duration. If you would like to book for longer, please contact us through the contact form."
      );
      return;
    }

    // Check if user details are complete
    if (
      !userDetails ||
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.dob ||
      !userDetails.address ||
      !userDetails.driversLicense ||
      !userDetails.phoneNumber
    ) {
      // If any user details are missing or incomplete, show an alert to the user
      alert(
        "To make a booking, please update and complete your personal details"
      );
      // Navigate to the account page for the user to update their details
      navigate("/account");
      return;
    }

    // Adjust the selectedStartDate to account for the user's timezone offset
    const startDate = new Date(
      selectedStartDate.getTime() +
        selectedStartDate.getTimezoneOffset() * 60 * 1000
    );

    // Adjust the selectedEndDate to account for the user's timezone offset
    const endDate = new Date(
      selectedEndDate.getTime() +
        selectedEndDate.getTimezoneOffset() * 60 * 1000
    );

    // Display the booking details to be sent to the server
    console.log("Sending booking:", {
      vanID,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    try {
      // Send a POST request to the server to create a new booking
      const response = await axios
        .post(
          `${API_URL}/bookings/new-booking`,
          {
            vanID,
            startDate: toLocalISOString(startDate).substring(0, 10),
            endDate: toLocalISOString(endDate).substring(0, 10),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // If the booking is successful, show a success alert with booking details
          alert(
            `New booking made for: \n
          Van: ${vanName.toUpperCase()} \n
          Start date - ${new Date(startDate).toDateString()} \n
          End date - ${new Date(endDate).toDateString()}\n
          Total Price: $${totalPrice}`
          );
          navigate("/account"); // Navigate to the user's account page after successful booking
        })
        .catch((error) => {
          // Handle different types of errors returned from the server
          if (error.response && error.response.status === 401) {
            // If the error response is 401 Unauthorized, user's session has expired, prompt to log in again
            alert("Your session has expired, please log in again to continue");
            localStorage.removeItem("token");
            navigate("/login"); // Navigate to the login page
          } else if (error.response && error.response.status === 400) {
            // If the error response is 400 Bad Request, the van is not available for selected dates
            alert(
              "The van is not available for the dates you have selected, please check your dates and try again."
            );
            // Show alert for van not available
          } else {
            console.error(error); // Log other errors to the console
          }
        });
    } catch (error) {
      console.error(error); // Log any errors that occur during the try block
    }
  };

  // If there's an error, display it on the screen
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center text-voyage-green font-normal mt-8 sm:p-16 text-left m-8">
      <VanDescriptions />
      <div className="flex-col items-end space-y-4 border border-voyage-green rounded-3xl shadow-lg pt-8 pb-8 mt-8 mb-8 sm:m-0 h-full sm:ml-10 lg:ml-24">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center px-5 space-y-4 text-voyage-black"
        >
          <p className="font-mono pt-6 pb-6">
            {totalPrice ? (
              <>
                Total price:{" "}
                <span className="text-3xl font-mono">${totalPrice}</span> AUD
              </>
            ) : (
              <>
                From <span className="text-3xl font-mono">${pricePerDay}</span>{" "}
                AUD / day
              </>
            )}
          </p>
          <div className="md:flex md:flex-col md:w-80 font-roboto font-normal text-voyage-green">
            <div className="flex justify-between pb-4">
              <label
                htmlFor="start-date-input"
                className="w-inherit text-md font-mono flex items-center"
              >
                From Date:
              </label>
              <input
                id="start-date-input"
                type="date"
                value={
                  selectedStartDate
                    ? selectedStartDate.toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) => {
                  let date = new Date(e.target.value);
                  const offset = date.getTimezoneOffset();
                  date = new Date(date.getTime() - offset * 60 * 1000);
                  setSelectedStartDate(date);
                }}
                className="font-mono text-center items-center bg-voyage-grey border border-voyage-green rounded-md p-1 shadow-md"
              />
            </div>
            <div className="flex justify-between w-full">
              <label
                htmlFor="end-date-input"
                className="w-inherit text-md font-mono flex items-center"
              >
                To Date:
              </label>
              <input
                id="end-date-input"
                type="date"
                value={
                  selectedEndDate
                    ? selectedEndDate.toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) => {
                  let date = new Date(e.target.value);
                  const offset = date.getTimezoneOffset();
                  date = new Date(date.getTime() - offset * 60 * 1000);
                  setSelectedEndDate(date);
                }}
                min={selectedStartDate?.toISOString().substring(0, 10)}
                className="font-mono text-center items-center bg-voyage-grey border border-voyage-green rounded-md p-1 shadow-md"
              />
            </div>
          </div>
          <Calendar
            onChange={handleDateChange}
            defaultActiveStartDate={new Date()}
            value={
              selectedStartDate && selectedEndDate
                ? [selectedStartDate, selectedEndDate]
                : null
            }
            tileDisabled={({ date }) => {
              date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
              const formattedDate = date.setHours(0, 0, 0, 0);
              return (
                formattedDate < today ||
                bookedDates.some(
                  (disabledDate) =>
                    disabledDate.setHours(0, 0, 0, 0) === formattedDate
                )
              );
            }}
          />
          <button
            type="submit"
            disabled={!selectedStartDate || !selectedEndDate}
            className={`text-white font-roboto font-light rounded px-4 py-2 border border-voyage-green shadow-md ${
              !selectedStartDate || !selectedEndDate
                ? "text-voyage-green bg-voyage-black cursor-not-allowed"
                : "bg-voyage-green"
            }`}
          >
            BOOK NOW
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingCalendar;
