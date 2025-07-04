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

const SummaryCards: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            params: { date: selectedDate },
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

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.191:8999/api/v1/dashboard/download-excel",
        {
          params: { date: selectedDate },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `challan-report-${selectedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download report.");
    }
  };

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
        {loading ? (
          <div>Loading summary...</div>
        ) : error ? (
          <div className="summary-cards error">{error}</div>
        ) : (
          <>
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
          <button onClick={handleDownloadReport} className="download-btn">
            <FiDownload size={28} /> Download Report (XLSX)
          </button>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;
