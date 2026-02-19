import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Dashboard() {
    const [timesheets, setTimesheets] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus, selectedWeek]);

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

    // Filtering logic
    const filteredData = timesheets.filter((sheet) => {
        const statusMatch =
            selectedStatus === "" || sheet.status === selectedStatus;

        const weekMatch =
            selectedWeek === "" || sheet.week === Number(selectedWeek);

        return statusMatch && weekMatch;
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);


    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <div className="navbar">
                <div className="nav-left">
                    <h1>ticktock</h1>
                    <span className="breadcrumb">Timesheets</span>
                </div>
                <div className="nav-right">
                    <span>Admin</span>
                    <button>Logout</button>
                </div>
            </div>

            {/* Content */}
            <div className="content-wrapper">
                <div className="card">
                    <h2>Your Timesheets</h2>

                    {/* Filters */}
                    <div className="filters">
                        <select
                            value={selectedWeek}
                            onChange={(e) => setSelectedWeek(e.target.value)}
                        >
                            <option value="">All Weeks</option>
                            {[...new Set(timesheets.map((t) => t.week))].map((week) => (
                                <option key={week} value={week}>
                                    Week {week}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="INCOMPLETE">Incomplete</option>
                            <option value="MISSING">Missing</option>
                        </select>
                    </div>

                    {/* Table */}
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
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="empty">
                                            No timesheets found
                                        </td>
                                    </tr>
                                ) : (
                                    currentRecords.map((sheet) => (
                                        <tr key={sheet.id}>
                                            <td>{sheet.week}</td>
                                            <td>{sheet.date}</td>
                                            <td>
                                                <span
                                                    className={`badge ${sheet.status.toLowerCase()}`}
                                                >
                                                    {sheet.status}
                                                </span>
                                            </td>
                                            <td>
                                                {sheet.status === "COMPLETED" && (
                                                    <button className="link-btn">View</button>
                                                )}
                                                {sheet.status === "INCOMPLETE" && (
                                                    <button className="link-btn">Update</button>
                                                )}
                                                {sheet.status === "MISSING" && (
                                                    <button className="link-btn">Create</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (UI Only) */}
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={currentPage === index + 1 ? "active" : ""}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
