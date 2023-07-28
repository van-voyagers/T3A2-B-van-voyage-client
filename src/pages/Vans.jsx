import { useState, useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingCalendar from '../components/BookingCalendar'
import VansSelect from '../components/VansSelect'
import MobileVanSelect from '../components/MobileVanSelect'
import VanDescriptions from '../components/VanDescriptions'
//import { VanContext } from '../contexts/VanContext'

function Vans() {
  const [selectedVan, setSelectedVan] = useState(null)
  const [vans, setVans] = useState([])
  //const { vans, setVans, selectedVan, setSelectedVan } = useContext(VanContext)
  //const handleVanSelect = (van) => {
  //  setSelectedVans((prev) => [...prev, van])
  //}

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VansSelect
        //className="text-center mt-20 text-xl font-roboto font-normal w-fit"
        //onVanSelect={handleVanSelect}
        onVansLoaded={setVans} 
      />
      <MobileVanSelect vans={vans} onVanSelect={setSelectedVan} /> {/* Add this line */}
      <div className="text-center mt-20 text-xl flex-grow">
        {selectedVan && (
          <div className="mb-8 md:hidden"> {/* md:hidden will hide this on medium and larger screens */}
            <p className="text-center mt-20 text-xl font-roboto-mono">
              {selectedVan.vanName}
            </p>
            <BookingCalendar vanID={selectedVan._id} pricePerDay={selectedVan.pricePerDay} vanName={selectedVan.vanName} />
          </div>
        )}
        {vans.map((van) => (
          <div key={van._id} className="mb-8 hidden md:block"> {/* hidden md:block will show this on medium and larger screens */}
            <p className="text-center mt-20 text-3xl font-mono">
              {van.vanName}
              
            </p>
            
            <BookingCalendar vanID={van._id} pricePerDay={van.pricePerDay} vanName={van.vanName} />
            
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Vans