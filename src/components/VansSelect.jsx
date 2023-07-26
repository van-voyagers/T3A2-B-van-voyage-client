import { useState, useEffect } from 'react'
import axios from 'axios'

function VansSelect({ onVansLoaded }) {
  useEffect(() => {
    fetchVans().then(onVansLoaded)
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

  return null
}

export default VansSelect
