import React from "react";

// MobileVanSelect component displays a dropdown menu of vans on mobile screens.
function MobileVanSelect({ vans, onVanSelect }) {
  return (
    <div className="relative w-1/2 mt-8 mx-auto">
      {/* The select element is used to display the vans. 
      When a van is selected, the onChange event triggers the onVanSelect function 
      with the van object that matches the selected value. */}
      <select
        onChange={(e) =>
          onVanSelect(vans.find((van) => van._id === e.target.value))
        }
        className="... md:hidden" // md:hidden will hide this on medium and larger screens
        style={{ textAlignLast: "center" }} 
      >
        <option value="">Select Van</option>
        {/* For each van in the vans array, an option element is created with the 
        van's ID as the value and the van's name as the display text. */}
        {vans.map((van) => (
          <option key={van._id} value={van._id} className="uppercase">
            {van.vanName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 md:hidden">
        {/* The SVG below is for aesthetic purposes only and has no effect on the logic of the component. */}
      </div>
    </div>
  );
}

export default MobileVanSelect;
