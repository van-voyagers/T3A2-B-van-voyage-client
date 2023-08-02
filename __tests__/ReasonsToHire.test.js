import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import extend-expect to add custom matchers
import ReasonsToHire from "../src/components/ReasonsToHire";

test("renders the ReasonsToHire component with correct data", () => {
  // Arrange: Render the ReasonsToHire component
  const { getByText } = render(<ReasonsToHire />);

  // Act: Find the elements by their text content
  const headerElement = getByText("REASONS TO HIRE WITH VAN VOYAGE");
  const reasonsData = [
    {
      title: "ADVENTURER'S ABODE",
      description:
        "Experience the freedom of the open road with a van designed for exploration. It's the perfect abode for your wandering spirit.",
    },
    // Add other reasons data here...
  ];

  // Assert: Check if the elements are present in the rendered output
  expect(headerElement).toBeInTheDocument();

  // Check if each reason title and description is present in the rendered output
  reasonsData.forEach((reason) => {
    const titleElement = getByText(reason.title);
    expect(titleElement).toBeInTheDocument();

    // Find the description element based on the title using nextSibling
    const descriptionElement = titleElement.nextSibling;

    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).toBe(reason.description);
  });
});


