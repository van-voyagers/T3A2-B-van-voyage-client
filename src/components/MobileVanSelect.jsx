function MobileVanSelect({ vans, onVanSelect }) {
  return (
    <div className="relative w-1/2 mt-8 mx-auto">
      <select
        onChange={(e) => onVanSelect(vans.find((van) => van._id === e.target.value))}
        className="w-full h-14 flex justify-center text-base text-voyage-black transition duration-500 ease-in-out transform border-4 voyage-green rounded-lg bg-voyage-white shadow-xl focus:voyage-white focus:bg-voyage-grey focus:outline-none focus:ring-0 text-center uppercase appearance-none md:hidden" // md:hidden will hide this on medium and larger screens
        style={{textAlignLast:'center'}} // Add this line
      >
        <option value="">Select Van</option>
        {vans.map((van) => (
          <option key={van._id} value={van._id} className="uppercase">
            {van.vanName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 md:hidden">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293L10 12l4.707-4.707L16 8.586 10 14.586 4 8.586z"/></svg>
      </div>
    </div>
  )
}

export default MobileVanSelect







