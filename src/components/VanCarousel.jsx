import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import Marigold Images
import marigold1 from "../assets/images/vans/marigold/marigold-1.png";
import marigold2 from "../assets/images/vans/marigold/marigold-2.jpeg";
import marigold3 from "../assets/images/vans/marigold/marigold-3.jpeg";
import marigold4 from "../assets/images/vans/marigold/marigold-4.jpeg";
import marigold5 from "../assets/images/vans/marigold/marigold-5.jpeg";
import marigold6 from "../assets/images/vans/marigold/marigold-6.jpeg";
import marigold7 from "../assets/images/vans/marigold/marigold-7.jpeg";
import marigold8 from "../assets/images/vans/marigold/marigold-8.jpeg";
import marigold9 from "../assets/images/vans/marigold/marigold-9.jpeg";
import marigold10 from "../assets/images/vans/marigold/marigold-10.jpeg";

// Import Eddie Images
import eddie1 from "../assets/images/vans/eddie/eddie-1.png";
import eddie2 from "../assets/images/vans/eddie/eddie-2.jpeg";
import eddie3 from "../assets/images/vans/eddie/eddie-3.jpeg";
import eddie4 from "../assets/images/vans/eddie/eddie-4.jpeg";
import eddie5 from "../assets/images/vans/eddie/eddie-5.jpeg";
import eddie6 from "../assets/images/vans/eddie/eddie-6.jpeg";
import eddie7 from "../assets/images/vans/eddie/eddie-7.jpeg";
import eddie8 from "../assets/images/vans/eddie/eddie-8.jpeg";
import eddie9 from "../assets/images/vans/eddie/eddie-9.jpeg";
import eddie10 from "../assets/images/vans/eddie/eddie-10.jpeg";

// Import Venga Bus Images
import vengaBus1 from "../assets/images/vans/venga-bus/venga-bus-1.png";
import vengaBus2 from "../assets/images/vans/venga-bus/venga-bus-2.jpeg";
import vengaBus3 from "../assets/images/vans/venga-bus/venga-bus-3.jpeg";
import vengaBus4 from "../assets/images/vans/venga-bus/venga-bus-4.jpeg";
import vengaBus5 from "../assets/images/vans/venga-bus/venga-bus-5.jpeg";
import vengaBus6 from "../assets/images/vans/venga-bus/venga-bus-6.jpeg";
import vengaBus7 from "../assets/images/vans/venga-bus/venga-bus-7.jpeg";
import vengaBus8 from "../assets/images/vans/venga-bus/venga-bus-8.jpeg";
import vengaBus9 from "../assets/images/vans/venga-bus/venga-bus-9.jpeg";
import vengaBus10 from "../assets/images/vans/venga-bus/venga-bus-10.jpeg";

// Map the van names to their images
const vanImages = {
  marigold: [
    marigold1,
    marigold2,
    marigold3,
    marigold4,
    marigold5,
    marigold6,
    marigold7,
    marigold8,
    marigold9,
    marigold10,
  ],
  eddie: [
    eddie1,
    eddie2,
    eddie3,
    eddie4,
    eddie5,
    eddie6,
    eddie7,
    eddie8,
    eddie9,
    eddie10,
  ],
  "venga-bus": [
    vengaBus1,
    vengaBus2,
    vengaBus3,
    vengaBus4,
    vengaBus5,
    vengaBus6,
    vengaBus7,
    vengaBus8,
    vengaBus9,
    vengaBus10,
  ],
};

function VanCarousel({ vanName }) {
  const images = vanImages[vanName.toLowerCase().replace(/\s/g, "-")];

  if (!images) {
    console.error(`No images found for van "${vanName}"`);
    return null;
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <Carousel
        showThumbs={true}
        showIndicators={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-64">
            <img
              src={image}
              alt={`${vanName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default VanCarousel;
