import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from '../components/Table'; 
import React from 'react';

const mockSortHandler = jest.fn();

beforeEach(() => {
  mockSortHandler.mockReset();
});

test('should render the table header with "Percentage Funded"', async () => {
  render(<Table />);
  
  const header = await screen.findByText(/Percentage Funded/i);
  expect(header).toBeInTheDocument();
});

test('should call onSort when a header is clicked', async () => {
  render(<Table onSort={mockSortHandler} />);
  
  const header = await screen.findByText(/Percentage Funded/i);
  
  fireEvent.click(header);

  expect(mockSortHandler).toHaveBeenCalledTimes(1);
});

test('should display "Loading..." when data is being fetched', async () => {
  render(<Table />);
  
  const loadingText = await screen.findByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});



test('should render no data message when there is no data', async () => {
  render(<Table data={[]} />);  
  
  const noDataMessage = await screen.findByText(/No data available/i);
  expect(noDataMessage).toBeInTheDocument();
});
