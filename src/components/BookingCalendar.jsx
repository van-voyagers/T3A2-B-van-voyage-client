import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import '../Calendar.css'
import axios from 'axios'
import VanDescriptions from './VanDescriptions'
import PersonalDetails from './PersonalDetails';

function BookingCalendar({ vanID, pricePerDay, vanName }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [totalPrice, setTotalPrice] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null);
  

  const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  useEffect(() => {
    console.log('Fetching bookings for van:', vanID)
    axios
      .get(`${API_URL}/bookings/van/${vanID}`)
      .then((response) => {
        const bookings = response.data
        const dates = bookings.flatMap((booking) => {
          const start = new Date(booking.startDate)
          const end = new Date(booking.endDate)
          const dateArray = []
          for (
            let date = start;
            date <= end;
            date.setDate(date.getDate() + 1)
          ) {
            dateArray.push(new Date(date))
          }
          return dateArray
        })
        setBookedDates(dates)
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error)
        setError('There was a problem fetching the booking data')
      })
  }, [vanID])
  

  const handleDateChange = (date) => {
    const offset = date.getTimezoneOffset()
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000)

    if (!selectedStartDate) {
      setSelectedStartDate(adjustedDate)
    } else if (!selectedEndDate && adjustedDate > selectedStartDate) {
      setSelectedEndDate(adjustedDate)
    } else {
      setSelectedStartDate(null)
      setSelectedEndDate(null)
    }
  }

  useEffect(() => {
    if (selectedStartDate) {
      document.getElementById('end-date-input').min = selectedStartDate
        .toISOString()
        .substring(0, 10)
    }
  }, [selectedStartDate])

  useEffect(() => {
    // This function calculates the total price on the client side when the selected start and end dates change
    function calculateTotalPrice() {
      if (selectedStartDate && selectedEndDate) {
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(
          Math.abs((selectedEndDate - selectedStartDate) / oneDay + 1)
        )
        if (diffDays > 1) {
          // If date range is more than one day
          setTotalPrice(diffDays * pricePerDay)
        } else {
          setTotalPrice(null) // Force to null if date range is one day or less
        }
      } else {
        setTotalPrice(null) // Force to null if no date range is selected
      }
    }
    calculateTotalPrice()
  }, [selectedStartDate, selectedEndDate, pricePerDay])

  function toLocalISOString(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        var norm = Math.floor(Math.abs(num))
        return (norm < 10 ? '0' : '') + norm
      }
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ':' +
      pad(tzo % 60)
    )
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token') // assuming token is stored in local storage?

    // Check if token exists before making a booking
    if (!token) {
      alert('Please log in to make a booking')
      navigate('/login')
      return
    }

    if (!userDetails || !userDetails.firstName || !userDetails.lastName) {
      alert('To make a booking, please update your personal details');
      return;
    }

    const startDate = new Date(
      selectedStartDate.getTime() +
        selectedStartDate.getTimezoneOffset() * 60 * 1000
    )
    const endDate = new Date(
      selectedEndDate.getTime() +
        selectedEndDate.getTimezoneOffset() * 60 * 1000
    )

    console.log('Sending booking:', {
      vanID,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }) // Added this line

    try {
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
          // Handling a successful booking
          alert(
            `New booking made for : \n
            Van: ${vanName.toUpperCase()} \n
            Start date - ${new Date(startDate).toDateString()} \n
            End date - ${new Date(endDate).toDateString()}\n
            Total Price: $${totalPrice}`
          )
          navigate('/account')
        })
        .catch((error) => {
          // Check if the error response from server is 401 Unauthorized
          if (error.response && error.response.status === 401) {
            alert('Your session has expired, please log in again to continue')
            localStorage.removeItem('token') // Optional: remove the invalid token
            navigate('/login') // Assuming you have a login page at this route
          } else if (error.response && error.response.status === 400) {
            alert(
              'The van is not available for the dates you have selected, please check your dates and try again.'
            )

            // Showing alert for van not available
          } else {
            console.error(error)
          }
        })
    } catch (error) {
      console.error(error)
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center text-voyage-green font-normal mt-8 sm:p-16 text-left m-8">
      <VanDescriptions />
      <div className="flex-col items-end space-y-4 border border-voyage-green rounded-3xl shadow-lg pt-8 pb-8 mt-8 mb-8 sm:m-0 h-full sm:ml-10 lg:ml-24">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center px-5 space-y-4 text-voyage-black"
        >
          {/*<h2>Booking Calendar</h2>*/}
          <p className="font-mono pt-6 pb-6">
            {totalPrice ? (
              <>
                Total price:{' '}
                <span className="text-3xl font-mono">
                  ${totalPrice}
                </span>{' '}
                AUD
              </>
            ) : (
              <>
                From{' '}
                <span className="text-3xl font-mono">
                  ${pricePerDay}
                </span>{' '}
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
                    : ''
                }
                onChange={(e) => {
                  let date = new Date(e.target.value)
                  const offset = date.getTimezoneOffset()
                  date = new Date(date.getTime() - offset * 60 * 1000)
                  setSelectedStartDate(date)
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
                    : ''
                }
                onChange={(e) => {
                  let date = new Date(e.target.value)
                  const offset = date.getTimezoneOffset()
                  date = new Date(date.getTime() - offset * 60 * 1000)
                  setSelectedEndDate(date)
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
              date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
              const formattedDate = date.setHours(0, 0, 0, 0) // Removes the time part of the date
              return (
                formattedDate < today ||
                bookedDates.some(
                  (disabledDate) =>
                    disabledDate.setHours(0, 0, 0, 0) === formattedDate
                )
              )
            }}
          />
          <button
            type="submit"
            disabled={!selectedStartDate || !selectedEndDate}
            className={`text-white font-roboto font-light rounded px-4 py-2 border border-voyage-green shadow-md ${
              !selectedStartDate || !selectedEndDate
                ? 'text-voyage-green bg-voyage-black cursor-not-allowed'
                : 'bg-voyage-green'
            }`}
          >
            BOOK NOW
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingCalendar
