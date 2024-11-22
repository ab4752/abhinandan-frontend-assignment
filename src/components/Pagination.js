
import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [pageInput, setPageInput] = useState('');

  const handlePageJump = () => {
    const pageNumber = Number(pageInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setPageInput('');
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6A9C89] text-white hover:bg-[#16423C]'}`}
        >
          Prev
        </button>
        {pageNumbers.map((page) =>
          Math.abs(currentPage - page) <= 1 || page === 1 || page === totalPages ? (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-[#16423C] text-white' : 'bg-[#6A9C89] text-white hover:bg-[#16423C]'}`}
            >
              {page}
            </button>
          ) : (
            page === 2 || page === totalPages - 1 ? (
              <span key={page} className="px-2">...</span>
            ) : null
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6A9C89] text-white hover:bg-[#16423C]'}`}
        >
          Next
        </button>
      </div>
      <div className="mt-2">
        <input
          type="number"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          placeholder="Jump to page"
          className="px-2 py-1 border rounded"
          aria-label="Enter page number"
        />
        <button onClick={handlePageJump} className="ml-2 px-4 py-2 bg-[#6A9C89] text-white rounded" aria-label="Jump to specified page">
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;

