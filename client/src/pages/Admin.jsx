import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Admin() {
  const [applications, setApplications] = useState([]);
const navigate = useNavigate();
  // ✅ ADD THIS (missing before)
  const [seatForm, setSeatForm] = useState({
    branch: "",
    category: "",
    count: ""
  });

  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const runAllocation = async () => {
    try {
      await API.post("/admin/allocate");
      alert("Allocation Done 🎯");
      fetchApplications();
    } catch (err) {
      alert("Error ❌");
    }
  };

  // ✅ FIXED FUNCTION
  const addSeat = async () => {
    try {
      await API.post("/admin/seat", seatForm);

      alert("Seats Added ✅");

      setSeatForm({
        branch: "",
        category: "",
        count: ""
      });

    } catch (err) {
      alert("Error ❌");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-white p-6">

      <h1 className="text-3xl mb-6 text-center">
        Admin Panel 👨‍💼
      </h1>
      <button
  onClick={() => navigate("/seats")}
  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
>
  View Seats 🪑
</button>
<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="absolute top-5 right-5 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
>
  Logout 🚪
</button>
      {/* Allocation Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={runAllocation}
          className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Run Allocation 🚀
        </button>
      </div>

      {/* Seat Form */}
      <div className="bg-white/10 p-6 rounded-xl mb-8">

        <h2 className="text-xl mb-4">Add Vacant Seats 🪑</h2>

        <div className="grid md:grid-cols-4 gap-4">

          {/* Branch */}
          <select
            value={seatForm.branch}
            onChange={(e) =>
              setSeatForm({ ...seatForm, branch: e.target.value })
            }
            className="p-2 rounded text-white bg-gray-700"
          >
            <option value="">Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
          </select>

          {/* Category */}
          <select
            value={seatForm.category}
            onChange={(e) =>
              setSeatForm({ ...seatForm, category: e.target.value })
            }
            className="p-2 rounded text-white bg-gray-700 "
          >
            <option value="">Category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>

          {/* Count */}
          <input
            type="number"
            value={seatForm.count}
            placeholder="Seats"
            className="p-2 rounded text-white bg-gray-700"
            onChange={(e) =>
              setSeatForm({ ...seatForm, count: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={addSeat}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Seats
          </button>

        </div>

      </div>

      {/* Applications Table */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">

        <h2 className="text-xl mb-4">
          Applied Students 📋
        </h2>

        <table className="w-full border-collapse">

          <thead>
            <tr className="border-b border-white/30">
              <th className="p-2">Name</th>
              <th className="p-2">Enrollment</th>
              <th className="p-2">CGPA</th>
              <th className="p-2">Category</th>
              <th className="p-2">Preferences</th>
              <th className="p-2">Status</th>
              <th className="p-2">Allotted</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center border-b border-white/10">

                <td className="p-2">{app.studentId?.name}</td>
                <td className="p-2">{app.studentId?.enrollmentNo}</td>
                <td className="p-2">{app.cgpa}</td>
                <td className="p-2">{app.category}</td>
                <td className="p-2">{app.preferences?.join(" → ")}</td>
                <td className="p-2">{app.status}</td>
                <td className="p-2">{app.allottedBranch || "-"}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;