import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SummaryCards.css";
import {
  FiClipboard,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
} from "react-icons/fi";

type SummaryData = {
  totalPolicies: number;
  successCount: number;
  failedCount: number;
};

interface SummaryCardsProps {
  onDownloadReport: () => void;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ onDownloadReport }) => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedDate, setSelectedDate] = useState<string>("2025-07-01");

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://192.168.100.191:8999/api/v1/dashboard/summary",
          {
            params: selectedDate ? { date: selectedDate } : {},
          }
        );
        const { total_policies, successful_challans, failed_challans } =
          response.data;

        setSummaryData({
          totalPolicies: total_policies,
          successCount: successful_challans,
          failedCount: failed_challans,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to load summary data.");
        setSummaryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [selectedDate]);

  return (
    <>
      {/* Date Picker */}
      <div className="summary-date-picker">
        <label htmlFor="summary-date">Select Date: </label>
        <input
          type="date"
          id="summary-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="summary-cards">
        {/* Loading / Error State */}
        {loading ? (
          <div>Loading summary...</div>
        ) : error ? (
          <div className="summary-cards error">{error}</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="summary-card">
              <div className="card-icon total">
                <FiClipboard size={28} />
              </div>
              <div className="card-content">
                <h3>Total Policies</h3>
                <p className="card-number">
                  {summaryData?.totalPolicies?.toLocaleString() ?? "—"}
                </p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon success">
                <FiCheckCircle size={28} />
              </div>
              <div className="card-content">
                <h3>Success Count</h3>
                <p className="card-number success-text">
                  {summaryData?.successCount?.toLocaleString() ?? "—"}
                </p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon failed">
                <FiXCircle size={28} />
              </div>
              <div className="card-content">
                <h3>Failed Count</h3>
                <p className="card-number failed-text">
                  {summaryData?.failedCount?.toLocaleString() ?? "—"}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Download Report */}
        <div className="summary-card download-card">
          <button onClick={onDownloadReport} className="download-btn">
            📥 Download Report (XLSX)
          </button>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;
