import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingCalendar from '../components/BookingCalendar'
import VansSelect from '../components/VansSelect'

function Vans() {
  const [selectedVan, setSelectedVan] = useState(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="text-center mt-20 text-xl flex-grow">
      <VansSelect className="text-center mt-20 text-xl font-roboto font-normal w-fit"onVanSelect={setSelectedVan} />
      {selectedVan && <p className="text-center mt-20 text-xl font-roboto font-black">{selectedVan.vanName}</p>}
      </div>
      {selectedVan && <BookingCalendar vanID={selectedVan._id}/>}
      <Footer />
    </div>
  )
}

export default Vans
