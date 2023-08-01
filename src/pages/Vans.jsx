import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingCalendar from '../components/BookingCalendar'
import VansSelect from '../components/VansSelect'
import MobileVanSelect from '../components/MobileVanSelect'
import VanCarousel from '../components/VanCarousel'



function Vans() {
  const [selectedVan, setSelectedVan] = useState(null)
  const [vans, setVans] = useState([])


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VansSelect onVansLoaded={setVans} />
      <MobileVanSelect vans={vans} onVanSelect={setSelectedVan} />
      <div className="text-center text-lg flex-grow">
        {selectedVan && (
          <div className="mb-8 md:hidden">
            <p className="text-center my-16 text-2xl text-voyage-black underline underline-offset-4 font-mono uppercase hidden md:block">
              {selectedVan.vanName}
            </p>
            <VanCarousel vanName={selectedVan.vanName} />
            <BookingCalendar vanID={selectedVan._id} pricePerDay={selectedVan.pricePerDay} vanName={selectedVan.vanName} />
          </div>
        )}
        {vans.map((van) => (
          <div key={van._id} className="my-16 hidden md:block">
            <p className="text-center text-2xl uppercase text-voyage-black underline underline-offset-4 font-mono">
              {van.vanName}
            </p>
            <VanCarousel vanName={van.vanName} />
            <BookingCalendar vanID={van._id} pricePerDay={van.pricePerDay} vanName={van.vanName} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Vans
