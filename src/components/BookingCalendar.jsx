import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'

function BookingCalendar({ vanID }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [bookedDates, setBookedDates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/bookings/van/${vanID}`)
    .then(response => {
      const bookings = response.data;
      const dates = bookings.flatMap(booking => {
        const start = new Date(booking.startDate)
        const end = new Date(booking.endDate)
        const dateArray = [];
        for (let date = start; date <= end; date.setDate(date.getDate() + 1 )) {
          dateArray.push(new Date(date))
        }
        return dateArray;
      })
      setBookedDates(dates)
    })
    .catch(error => {
      console.error('Error fetching bookings:', error)
      setError('There was a problem fetching the booking data')
    })
  }, [vanID])

  const handleDateChange = (date) => {
    if(!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate) {
      setSelectedEndDate(date)
    } else {
      setSelectedStartDate(null)
      setSelectedEndDate(null)
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex flex-col items-center px-5 space-y-4 text-voyage-black font-roboto font-normal">
      <h2>Booking Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        tileDisabled={({ date }) => {
          const formattedDate = date.setHours(0, 0, 0, 0);  // Removes the time part of the date
          return bookedDates.some(
            (disabledDate) => disabledDate.setHours(0, 0, 0, 0) === formattedDate
          );
        }}
      />
      <div className="box-border p-4 font-roboto font-normal">
        <p>Start Date: {selectedStartDate?.toLocaleDateString()}</p>
        <p>End Date: {selectedEndDate?.toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default BookingCalendar
