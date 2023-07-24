import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingCalendar from '../components/BookingCalendar'
import VansSelect from '../components/VansSelect'

function Vans() {
  const [selectedVan, setSelectedVan] = useState(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VansSelect onVanSelect={setSelectedVan} />
      {selectedVan && <p>Van: {selectedVan.name}</p>}
      <p className="text-center mt-20 text-xl flex-grow">Vans</p>
      {selectedVan && <BookingCalendar vanID={selectedVan._id}/>}
      <Footer />
    </div>
  )
}

export default Vans
