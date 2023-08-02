import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MobileVanSelect from '../src/components/MobileVanSelect'

test('renders MobileVanSelect component and displays van options correctly', () => {
  const vans = [
    { _id: '1', vanName: 'Van 1' },
    { _id: '2', vanName: 'Van 2' },
  ]
  
  const onVanSelect = jest.fn();

  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />)

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();
  
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(3); // Since there is an extra "Select Van" option
  expect(options[1]).toHaveTextContent('Van 1');
  expect(options[2]).toHaveTextContent('Van 2');
})

test('calls onVanSelect when a van is selected', () => {
  const vans = [
    { _id: '1', vanName: 'Van 1' },
    { _id: '2', vanName: 'Van 2' },
  ]
  
  const onVanSelect = jest.fn();

  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />)

  const selectElement = screen.getByRole('combobox');
  fireEvent.change(selectElement, { target: { value: '1' } });
  
  expect(onVanSelect).toHaveBeenCalledWith(vans[0]);
})

test('renders "Select Van" option initially', () => {
  const vans = [
    { _id: '1', vanName: 'Van 1' },
    { _id: '2', vanName: 'Van 2' },
  ]
  
  const onVanSelect = jest.fn();

  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />)

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();
  
  const initialOption = screen.getByText('Select Van');
  expect(initialOption).toBeInTheDocument();
  expect(initialOption.selected).toBeTruthy();
})

test('renders no van options when vans array is empty', () => {
  const vans = []
  
  const onVanSelect = jest.fn();

  render(<MobileVanSelect vans={vans} onVanSelect={onVanSelect} />)

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();
  
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(1); // Only "Select Van" option should be present
})

