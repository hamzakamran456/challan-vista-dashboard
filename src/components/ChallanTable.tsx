import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ChallanTable.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Challan = {
  policy_number: string;
  challan_number: string | null;
  status: "success" | "failed";
};

const ChallanTable = () => {
  const [data, setData] = useState<Challan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  const fetchData = async (date?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "http://192.168.100.191:8999/api/v1/dashboard/table",
        {
          params: date ? { date } : {},
        }
      );

      const result = response.data;

      if (Array.isArray(result.rows)) {
        setData(result.rows);
      } else {
        throw new Error("Invalid response format: 'rows' not found");
      }
    } catch (err) {
      setError("Failed to load challan data.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status: string) =>
    status.toLowerCase() === "success" ? (
      <FaCheckCircle className="status-icon-success" />
    ) : (
      <FaTimesCircle className="status-icon-failed" />
    );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="challan-table-container">
      <h2>Challan Details</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="challan-table">
              <thead>
                <tr>
                  <th>Policy Number</th>
                  <th>Challan Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.policy_number}</td>
                    <td>{row.challan_number || "-"}</td>
                    <td className="status-cell">
                      {getStatusIcon(row.status)}
                      <span className={`status-text ${row.status}`}>
                        {row.status.charAt(0).toUpperCase() +
                          row.status.slice(1)}
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
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallanTable;
