
import React, { useState } from 'react';
import '../styles/ChallanTable.css';

const ChallanTable = () => {
  // Sample data - in a real app this would come from an API
  const sampleData = [
    { id: 1, policyNumber: 'POL001234', customerName: 'John Doe', challanNumber: 'CH001234', status: 'Success' },
    { id: 2, policyNumber: 'POL001235', customerName: 'Jane Smith', challanNumber: 'CH001235', status: 'Success' },
    { id: 3, policyNumber: 'POL001236', customerName: 'Mike Johnson', challanNumber: 'CH001236', status: 'Failed' },
    { id: 4, policyNumber: 'POL001237', customerName: 'Sarah Wilson', challanNumber: 'CH001237', status: 'Success' },
    { id: 5, policyNumber: 'POL001238', customerName: 'David Brown', challanNumber: 'CH001238', status: 'Success' },
    { id: 6, policyNumber: 'POL001239', customerName: 'Lisa Davis', challanNumber: 'CH001239', status: 'Failed' },
    { id: 7, policyNumber: 'POL001240', customerName: 'Tom Anderson', challanNumber: 'CH001240', status: 'Success' },
    { id: 8, policyNumber: 'POL001241', customerName: 'Emily Taylor', challanNumber: 'CH001241', status: 'Success' },
    { id: 9, policyNumber: 'POL001242', customerName: 'Chris Miller', challanNumber: 'CH001242', status: 'Failed' },
    { id: 10, policyNumber: 'POL001243', customerName: 'Amanda Clark', challanNumber: 'CH001243', status: 'Success' },
    { id: 11, policyNumber: 'POL001244', customerName: 'Robert Lee', challanNumber: 'CH001244', status: 'Success' },
    { id: 12, policyNumber: 'POL001245', customerName: 'Michelle White', challanNumber: 'CH001245', status: 'Failed' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sampleData.slice(startIndex, endIndex);

  const getStatusIcon = (status) => {
    return status === 'Success' ? 
      <span className="status-icon success">✅</span> : 
      <span className="status-icon failed">❌</span>;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="challan-table-container">
      <h2>Challan Details</h2>
      
      <div className="table-wrapper">
        <table className="challan-table">
          <thead>
            <tr>
              <th>Policy Number</th>
              <th>Customer Name</th>
              <th>Challan Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id}>
                <td>{row.policyNumber}</td>
                <td>{row.customerName}</td>
                <td>{row.challanNumber}</td>
                <td className="status-cell">
                  {getStatusIcon(row.status)}
                  <span className={`status-text ${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        
        <div className="pagination-info">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChallanTable;
