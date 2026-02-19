import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Badge from "../components/ui/Badge";
import ""

export default function Dashboard() {
  const [timesheets, setTimesheets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtering logic
  const filteredData = timesheets.filter((sheet) =>
    selectedStatus ? sheet.status === selectedStatus : true
  );

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/timesheets");
        setTimesheets(res.data);
      } catch (err) {
        setError("Failed to fetch timesheets");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading & Error return must be BEFORE main return
  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="nav-left">
          <h1>ticktock</h1>
          <span className="breadcrumb">Timesheets</span>
        </div>
        <div className="nav-right">
          <span>John Doe</span>
          <button>Logout</button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="card">
          <h2>Your Timesheets</h2>

          <div className="filters">
            <select>
              <option>Date Range</option>
            </select>
            <select>
              <option>Status</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Week #</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(sheet => (
                  <tr key={sheet.id}>
                    <td>{sheet.week}</td>
                    <td>{sheet.date}</td>
                    <td>
                      <span className={`badge ${sheet.status.toLowerCase()}`}>
                        {sheet.status}
                      </span>
                    </td>
                    <td>
                      <button className="link-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>

  );
}
