
import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import fetchData from './api';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage spinner visibility

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); // Start loading
      const fetchedData = await fetchData();
      setData(fetchedData);
      setIsLoading(false); // Data fetched, stop loading
    };
    loadData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRecordsChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when records per page changes
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (direction === 'ascending') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentProjects = data.slice(startIndex, startIndex + recordsPerPage);
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-[#16423C] text-[#E9EFEC]' : 'bg-[#E9EFEC] text-[#16423C]'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="px-4 py-2 text-white bg-[#6A9C89] rounded hover:bg-[#16423C]"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          {/* Dropdown for records per page */}
          <div className="flex items-center">
            <label htmlFor="recordsPerPage" className="mr-2">Records per page:</label>
            <select
              id="recordsPerPage"
              value={recordsPerPage}
              onChange={handleRecordsChange}
              className="border border-[#6A9C89] rounded px-2 py-1 focus:outline-none bg-white dark:bg-[#16423C] dark:text-white"
              tabIndex="0" // Ensures it is included in the Tab navigation order
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? <div>Loading...</div> : (
          <div>
            <Table
              projects={currentProjects}
              startIndex={startIndex}
              totalRecords={totalRecords}
              recordsPerPage={recordsPerPage}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
