import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();

  it('should render pagination buttons and handle page change', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={2}
        onPageChange={mockPageChange}
      />
    );

    const prevButton = screen.getByLabelText(/previous page/i);
    const nextButton = screen.getByLabelText(/next page/i);

    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);
    expect(mockPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(prevButton);
    expect(mockPageChange).toHaveBeenCalledWith(1);
  });

  it('should disable prev button on first page and next button on last page', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockPageChange}
      />
    );

    const prevButton = screen.getByLabelText(/previous page/i);
    const nextButton = screen.getByLabelText(/next page/i);

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });
});
