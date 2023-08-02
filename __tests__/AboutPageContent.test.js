import React from "react";
import { render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect"; // Import toBeInTheDocument
import AboutPageContent from "../src/components/AboutPageContent";

test("renders the AboutPageContent component with the correct text", () => {
  // Arrange: Render the AboutPageContent component
  const { getByText } = render(<AboutPageContent />);

  // Act: Find the elements by their text content
  const headerElement = getByText("ABOUT VAN VOYAGE");
  const paragraphElement = getByText(
    /Lorem ipsum dolor sit amet, consectetur adipiscing elit/i
  );

  // Assert: Check if the elements are present in the rendered output
  expect(headerElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
});

