import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 🔥 call backend to clear cookie
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login");

    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
           Admin Panel
        </h1>
        <p className="text-white/60 text-sm">
          Manage applications & seat allocation
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* View Seats */}
        <button
          onClick={() => navigate("/seats")}
          className="bg-blue-500/80 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
        >
           View Seats
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
        >
           Logout
        </button>

      </div>
    </div>
  );
}

export default AdminHeader;