
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SummaryCards from '../components/SummaryCards';
import ChallanTable from '../components/ChallanTable';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleDownloadReport = () => {
    // Simulate Excel download
    alert('Excel report downloaded successfully!');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Stamp Duty Challan Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      
      <div className="dashboard-content">
        <SummaryCards onDownloadReport={handleDownloadReport} />
        <ChallanTable />
      </div>
    </div>
  );
};

export default Dashboard;
