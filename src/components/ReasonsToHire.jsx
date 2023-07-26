import React from "react";

function ReasonsToHire() {
  const reasonsData = [
    {
      title: "ADVENTURER'S ABODE",
      description:
        "Vivamus a eros sit amet diam fringilla mollis sit amet in nisl. Fusce hendrerit, erat nec venenatis aliquam, turpis est vulputate mauris, eget maximus justo mi nec diam. Curabitur at nulla nulla.",
    },
    {
      title: "MODERN LUXURY",
      description:
        "Vivamus a eros sit amet diam fringilla mollis sit amet in nisl. Fusce hendrerit, erat nec venenatis aliquam, turpis est vulputate mauris, eget maximus justo mi nec diam. Curabitur at nulla nulla.",
    },
    {
      title: "SAFETY IS PARAMOUNT",
      description:
        "Vivamus a eros sit amet diam fringilla mollis sit amet in nisl. Fusce hendrerit, erat nec venenatis aliquam, turpis est vulputate mauris, eget maximus justo mi nec diam. Curabitur at nulla nulla.",
    },
    {
      title: "THE ARTISAN'S TOUCH",
      description:
        "Vivamus a eros sit amet diam fringilla mollis sit amet in nisl. Fusce hendrerit, erat nec venenatis aliquam, turpis est vulputate mauris, eget maximus justo mi nec diam. Curabitur at nulla nulla.",
    },
    {
      title: "MINIMALIST SANCTUARY",
      description:
        "Vivamus a eros sit amet diam fringilla mollis sit amet in nisl. Fusce hendrerit, erat nec venenatis aliquam, turpis est vulputate mauris, eget maximus justo mi nec diam. Curabitur at nulla nulla.",
    },
    {
      title: "SUSTAINABLE TRAVEL",
      description:
        "Vivamus a eros sit amet diam fringilla mollis sit amet in nisl. Fusce hendrerit, erat nec venenatis aliquam, turpis est vulputate mauris, eget maximus justo mi nec diam. Curabitur at nulla nulla.",
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
          <p className="text-xs sm:text-sm lg:text-lg font-roboto-mono mt-2">
            {reason.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReasonsToHire;
