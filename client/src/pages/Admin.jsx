// pages/Admin.jsx

import { useEffect, useState } from "react";
import API from "../services/api";

import AdminHeader from "../components/AdminHeader";
import AllocationButton from "../components/AllocationButton";
import SeatForm from "../components/SeatForm";
import ApplicationsTable from "../components/ApplicationsTable";

function Admin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [seatForm, setSeatForm] = useState({
    branch: "",
    category: "",
    count: ""
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const runAllocation = async () => {
    try {
      try {
  const res = await API.post("/admin/allocate");
  alert(res.data.message);
} catch (err) {
  alert(err.response?.data?.message || "Allocation failed ");
}
      fetchApplications();
      fetchSeats();
    } catch {
      alert("Error ");
    }
  };
  

  const addSeat = async () => {
    try {
      await API.post("/admin/seat", seatForm);

      alert("Seats Added ");

      setSeatForm({
        branch: "",
        category: "",
        count: ""
      });

    } catch {
      alert("Error ");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden p-6">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="animate-fadeIn">
          <AdminHeader />
        </div>

        {/* Allocation */}
        <div className="animate-fadeIn delay-100">
          <AllocationButton runAllocation={runAllocation} />
        </div>

        {/* Seat Form */}
        <div className="animate-fadeIn delay-200">
          <SeatForm
            seatForm={seatForm}
            setSeatForm={setSeatForm}
            addSeat={addSeat}
          />
        </div>

        {/* Table */}
        <div className="animate-fadeIn delay-300">
          {loading ? (
            <div className="text-center text-white/70 mt-10 animate-pulse">
              Loading applications...
            </div>
          ) : (
            <ApplicationsTable applications={applications} />
          )}
        </div>

      </div>

    </div>
  );
}

export default Admin;