import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VanDescriptions from "../src/components/VanDescriptions";

describe("VanDescriptions", () => {
  it("renders the component correctly", () => {
    // Arrange: Render the VanDescriptions component
    render(<VanDescriptions />);

    // Act and Assert: Check for headings and list items using screen.getByText
    expect(screen.getByText("VAN 🚐")).toBeInTheDocument();
    expect(screen.getByText("SLEEPING 💤")).toBeInTheDocument();
    expect(screen.getByText("KITCHEN 🥘")).toBeInTheDocument();
    expect(screen.getByText("BATHROOM 🧼")).toBeInTheDocument();
    expect(screen.getByText("OUTDOOR 🏕")).toBeInTheDocument();
    expect(screen.getByText("ENTERTAINMENT 🎮")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Retro design, modern functionality with air conditioning and heating."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Comfortable double bed with fresh linens and warm duvet."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Stove, fridge, and sink in fully-equipped kitchenette.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Compact bathroom with hot-water shower and toilet.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Built-in awning and outdoor furniture for outdoor dining and relaxation."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Onboard multimedia system with Bluetooth connectivity.")
    ).toBeInTheDocument();
  });
});
