import { useEffect, useContext } from 'react'
import axios from 'axios'
//import { VanContext } from '../contexts/VanContext'

function VansSelect({ onVansLoaded }) {
  const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
  //const { vans, setSelectedVan } = useContext(VanContext)
  useEffect(() => {
    fetchVans().then(onVansLoaded)
  }, [])

  const fetchVans = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings/vans`)
      return res.data
    } catch (error) {
      console.error('Error fetching vans:', error)
      return []
    }
  }

  return null
}

export default VansSelect
