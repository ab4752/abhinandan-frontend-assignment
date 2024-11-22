import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App'; 
import React from 'react';

jest.mock('./fetchData', () => ({
  fetchData: jest.fn(() => Promise.resolve([{ id: 1, name: 'Project 1', percentageFunded: 50 }]))
}));

beforeEach(() => {
  // Reset any mock functions here if necessary
});

test('should display loading spinner initially', () => {
  render(<App />);

  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});

test('should display table after data is fetched', async () => {
  render(<App />);

  await act(async () => {
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
  });

  expect(screen.getByText('Percentage Funded')).toBeInTheDocument();
  expect(screen.getByText('Project 1')).toBeInTheDocument(); 
});

test('should toggle dark mode', async () => {
  render(<App />);

  const toggleButton = screen.getByText(/dark mode/i);

  fireEvent.click(toggleButton);


  expect(screen.getByText(/light mode/i)).toBeInTheDocument();
});

