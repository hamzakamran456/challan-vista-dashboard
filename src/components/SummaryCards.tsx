
import React from 'react';
import '../styles/SummaryCards.css';

const SummaryCards = ({ onDownloadReport }) => {
  // Sample data - in a real app this would come from an API
  const summaryData = {
    totalPolicies: 1250,
    successCount: 1180,
    failedCount: 70
  };

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-icon total">📋</div>
        <div className="card-content">
          <h3>Total Policies</h3>
          <p className="card-number">{summaryData.totalPolicies.toLocaleString()}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon success">✅</div>
        <div className="card-content">
          <h3>Success Count</h3>
          <p className="card-number success-text">{summaryData.successCount.toLocaleString()}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon failed">❌</div>
        <div className="card-content">
          <h3>Failed Count</h3>
          <p className="card-number failed-text">{summaryData.failedCount.toLocaleString()}</p>
        </div>
      </div>

      <div className="summary-card download-card">
        <button onClick={onDownloadReport} className="download-btn">
          📥 Download Report (XLSX)
        </button>
      </div>
    </div>
  );
};

export default SummaryCards;
