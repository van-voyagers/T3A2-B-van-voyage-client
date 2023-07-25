import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import '../Calendar.css'
import axios from 'axios'

function BookingCalendar({ vanID, pricePerDay }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/bookings/van/${vanID}`)
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
    if(!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate && date > selectedStartDate) {
      setSelectedEndDate(date)
    } else {
      setSelectedStartDate(null)
      setSelectedEndDate(null)
    }
  }

  useEffect(() => {
    if(selectedStartDate){
      document.getElementById('end-date-input').min = selectedStartDate.toISOString().substring(0,10);
    }
  }, [selectedStartDate]);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token') // assuming token is stored in local storage?

    try {
      const response = await axios
        .post(
          'http://localhost:3000/bookings/new-booking',
          {
            vanID,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Handling a successful booking
          alert('New booking made!')
          navigate('/account')
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex flex-col items-center px-5 space-y-4 text-voyage-black font-roboto font-normal">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center px-5 space-y-4 text-voyage-black"
      >
        <h2>Booking Calendar</h2>
        <p className="font-roboto font-normal">From <span className="text-lg font-roboto font-black ">${pricePerDay}</span> AUD / day</p>
        <div className="flex space-x-4 font-roboto font-normal">
          {' '}
          {/* input fields for start and end dates */}
          <input
            type={selectedStartDate ? 'date' : 'text'}
            value={
              selectedStartDate
                ? selectedStartDate.toISOString().substring(0, 10)
                : ''
            }
            onChange={(e) => setSelectedStartDate(new Date(e.target.value))}
            placeholder="From date..."
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) =>
              (e.target.type = selectedStartDate ? 'date' : 'text')
            }
            className="font-roboto font-normal"
          />
          <input
            id="end-date-input"
            type={selectedEndDate ? 'date' : 'text'}
            value={
              selectedEndDate
                ? selectedEndDate.toISOString().substring(0, 10)
                : ''
            }
            onChange={(e) => setSelectedEndDate(new Date(e.target.value))}
            placeholder="To date..."
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = selectedEndDate ? 'date' : 'text')}
            min={selectedStartDate?.toISOString().substring(0, 10)}
            className="font-roboto font-normal"
          />
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
            const formattedDate = date.setHours(0, 0, 0, 0) // Removes the time part of the date
            return bookedDates.some(
              (disabledDate) =>
                disabledDate.setHours(0, 0, 0, 0) === formattedDate
            )
          }}
        />
        <button
          type="submit"
          disabled={!selectedStartDate || !selectedEndDate} // button is disabled if either date is not selected
          className="bg-voyage-green text-white font-roboto font-light rounded px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default BookingCalendar
