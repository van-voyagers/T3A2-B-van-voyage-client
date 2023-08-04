import React from "react";
import { render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import AboutPageContent from "../src/components/AboutPageContent";

test("renders the AboutPageContent component with the correct text", () => {
  const { getByText } = render(<AboutPageContent />);

  const headerElement = getByText("ABOUT VAN VOYAGE"); // Looking for the header element

  const paragraphElement = getByText(
    /Van Voyage was born from a passion for exploration and a deep respect for nature/i // Looking for the paragraph element
  );

  expect(headerElement).toBeInTheDocument(); // Expects the header element to be present
  expect(paragraphElement).toBeInTheDocument(); // Expects the paragraph element to be present
});

