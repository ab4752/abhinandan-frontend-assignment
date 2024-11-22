
import React, { useEffect, useRef } from 'react';

const Table = ({ projects, startIndex, totalRecords, recordsPerPage, onSort, sortConfig }) => {
  const firstSortableHeaderRef = useRef(null);

  useEffect(() => {
    if (firstSortableHeaderRef.current) {
      firstSortableHeaderRef.current.focus();
    }
  }, [sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  return (
    <div>
      <div className="mb-2">
        Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, totalRecords)} of {totalRecords}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse" role="table">
          <thead className="bg-[#C4DAD2] dark:bg-[#6A9C89]">
            <tr>
              <th className="py-2 px-4 border text-black dark:text-white" scope="col">
                S.No.
              </th>
              <th
                className="py-2 px-4 border cursor-pointer text-black dark:text-white"
                onClick={() => onSort('percentage.funded')}
                onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onSort('percentage.funded') : null}
                aria-sort={sortConfig.key === 'percentage.funded' ? sortConfig.direction : 'none'}
                role="columnheader"
                tabIndex="0"
                ref={firstSortableHeaderRef}
              >
                Percentage Funded {getSortIcon('percentage.funded')}
              </th>
              <th
                className="py-2 px-4 border cursor-pointer text-black dark:text-white"
                onClick={() => onSort('amt.pledged')}
                onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onSort('amt.pledged') : null}
                aria-sort={sortConfig.key === 'amt.pledged' ? sortConfig.direction : 'none'}
                role="columnheader"
                tabIndex="0"
              >
                Amount Pledged {getSortIcon('amt.pledged')}
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-[#6A9C89]">{startIndex + index + 1}</td>
                <td className="py-2 px-4 border border-[#6A9C89]">{project['percentage.funded']}</td>
                <td className="py-2 px-4 border border-[#6A9C89]">{project['amt.pledged']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

