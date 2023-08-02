import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MobileVanSelect from "../src/components/MobileVanSelect";

// Test that the MobileVanSelect component renders correctly and displays the van options
test("renders MobileVanSelect component and displays van options correctly", () => {
  // Mock van data for testing
  const vans = [
    { _id: "1", vanName: "Van 1" },
    { _id: "2", vanName: "Van 2" },
  ];

  // Mock function to be called when a van is selected
  const onVanSelect = jest.fn();

  // Render the MobileVanSelect component with the mock data
  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />);

  // Check that the select element is rendered
  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();

  // Check that the correct number of van options are rendered
  const options = screen.getAllByRole("option");
  expect(options.length).toBe(3);
  expect(options[1]).toHaveTextContent("Van 1");
  expect(options[2]).toHaveTextContent("Van 2");
});

// Test that the onVanSelect function is called when a van is selected
test("calls onVanSelect when a van is selected", () => {
  // Mock van data for testing
  const vans = [
    { _id: "1", vanName: "Van 1" },
    { _id: "2", vanName: "Van 2" },
  ];

  // Mock function to be called when a van is selected
  const onVanSelect = jest.fn();

  // Render the MobileVanSelect component with the mock data
  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />);

  // Find the select element and trigger a change event with a selected value of '1'
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "1" } });

  // Check that the onVanSelect function is called with the correct van data
  expect(onVanSelect).toHaveBeenCalledWith(vans[0]);
});

// Test that the "Select Van" option is rendered initially
test('renders "Select Van" option initially', () => {
  // Mock van data for testing
  const vans = [
    { _id: "1", vanName: "Van 1" },
    { _id: "2", vanName: "Van 2" },
  ];

  // Mock function to be called when a van is selected
  const onVanSelect = jest.fn();

  // Render the MobileVanSelect component with the mock data
  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />);

  // Check that the select element is rendered
  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();

  // Check that the "Select Van" option is rendered and selected by default
  const initialOption = screen.getByText("Select Van");
  expect(initialOption).toBeInTheDocument();
  expect(initialOption.selected).toBeTruthy();
});

// Test that no van options are rendered when the vans array is empty
test("renders no van options when vans array is empty", () => {
  // Mock empty van data for testing
  const vans = [];

  // Mock function to be called when a van is selected
  const onVanSelect = jest.fn();

  // Render the MobileVanSelect component with the mock data
  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />);

  // Check that the select element is rendered
  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();

  // Check that no van options are rendered
  const options = screen.getAllByRole("option");
  expect(options.length).toBe(1);
});
