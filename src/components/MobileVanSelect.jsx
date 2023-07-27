function MobileVanSelect({ vans, onVanSelect }) {
  return (
    <select
      onChange={(e) => onVanSelect(vans.find((van) => van._id === e.target.value))}
      className="w-full h-16 flex justify-center text-base text-black transition duration-500 ease-in-out transform border-4 voyage-green rounded-4 bg-white shadow-xl focus:voyage-white focus:bg-voyage-grey focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 text-center md:hidden" // md:hidden will hide this on medium and larger screens
    >
      <option value="">Select a van</option>
      {vans.map((van) => (
        <option key={van._id} value={van._id}>
          {van.vanName}
        </option>
      ))}
    </select>
  )
}

export default MobileVanSelect
