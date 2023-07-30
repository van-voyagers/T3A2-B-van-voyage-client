import React from "react";

function ReasonsToHire() {
  const reasonsData = [
    {
      title: "ADVENTURER'S ABODE",
      description:
        "Experience the freedom of the open road with a van designed for exploration. It's the perfect abode for your wandering spirit.",
    },
    {
      title: "MODERN LUXURY",
      description:
        "Indulge in the comfort of modern amenities while surrounded by nature. Our vans are a synthesis of luxury and adventure.",
    },
    {
      title: "SAFETY IS PARAMOUNT",
      description:
        "Our vans are equipped with safety features and emergency equipment. Your peace of mind is our top priority.",
    },
    {
      title: "THE ARTISAN'S TOUCH",
      description:
        "Every van features artisan craftsmanship. Experience a thoughtful design that marries form and function beautifully.",
    },
    {
      title: "MINIMALIST SANCTUARY",
      description:
        "Immerse in the tranquility of minimalistic interiors. Our vans offer a serene retreat from the hustle and bustle.",
    },
    {
      title: "SUSTAINABLE TRAVEL",
      description:
        "Travel responsibly with our eco-friendly features. Explore the great outdoors while leaving a minimal footprint.",
    },
  ];

  return (
    <div className="text-voyage-black text-center mb-10 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 grid gap-8 grid-cols-2 lg:grid-cols-3">
      <h1 className="font-roboto font-normal pt-8 pb-4 lg:pt-12 col-span-full text-sm sm:text-sm lg:text-lg">
        REASONS TO HIRE WITH VAN VOYAGE
      </h1>
      {reasonsData.map((reason, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xs sm:text-sm lg:text-lg">{reason.title}</h2>
          <p className="text-xs sm:text-sm lg:text-lg font-mono mt-2">
            {reason.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReasonsToHire;
