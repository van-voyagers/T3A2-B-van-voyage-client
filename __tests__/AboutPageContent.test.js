import React from "react";
import { render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import AboutPageContent from "../src/components/AboutPageContent";

// Define a test case
test("renders the AboutPageContent component with the correct text", () => {
  // Arrange step: Render the component to be tested (AboutPageContent)
  const { getByText } = render(<AboutPageContent />);

  // Act step: Query for elements in the rendered component using their expected text content
  const headerElement = getByText("ABOUT VAN VOYAGE"); // Looking for the header element
  const paragraphElement = getByText(
    /Lorem ipsum dolor sit amet, consectetur adipiscing elit/i // Looking for the paragraph element
  );

  // Assert step: Check if the expected elements are present in the document
  // (meaning the elements were rendered correctly with the expected text)
  expect(headerElement).toBeInTheDocument(); // Expects the header element to be present
  expect(paragraphElement).toBeInTheDocument(); // Expects the paragraph element to be present
});
