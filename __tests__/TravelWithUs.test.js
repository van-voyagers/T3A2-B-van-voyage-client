import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import "@testing-library/jest-dom/extend-expect"; // Import MemoryRouter to wrap the NavLink

import TravelWithUs from "../src/components/TravelWithUs";

test("renders the TravelWithUs component with correct content", () => {
  // Arrange
  const { getByText } = render(
    // Wrap the component with MemoryRouter to use NavLink without Router warnings
    <MemoryRouter>
      <TravelWithUs />
    </MemoryRouter>
  );

  // Act: Find the elements by their text content
  const headingElement = getByText("TRAVEL WITH US");
  const paragraphElement = getByText(
    /Vintage camper-vans, meticulously refurbished and uniquely designed,/i
  );
  const buttonElement = getByText("BOOK NOW");

  // Assert: Check if the elements are present in the rendered output
  expect(headingElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
