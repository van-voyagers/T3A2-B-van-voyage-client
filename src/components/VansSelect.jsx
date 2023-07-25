// VansSelect.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

function VansSelect({ onVanSelect }) {
  const [vans, setVans] = useState([])

  useEffect(() => {
    // call API endpoint to fetch vans data
    fetchVans().then(setVans)
  }, [])

  const fetchVans = async () => {
    try {
      const res = await axios.get('http://localhost:3000/bookings/vans')
      return res.data
    } catch (error) {
      console.error('Error fetching vans:', error)
      return []
    }
  }

  const handleVanSelect = (event) => {
    const selectedVan = vans.find((van) => van._id === event.target.value)
    onVanSelect(selectedVan)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <select
        onChange={handleVanSelect}
        className="w-64 px-3 py-2 mt-1 mb-3 text-base text-black transition duration-500 ease-in-out transform border-4 voyage-green rounded-4 bg-white shadow-xl focus:voyage-white focus:bg-voyage-grey focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 text-center"
      >
        <option value="">Select a van</option>
        {vans.map((van) => (
          <option key={van._id} value={van._id}>
            {van.vanName}
          </option>
        ))}
      </select>
    </div>
  )
}

export default VansSelect
