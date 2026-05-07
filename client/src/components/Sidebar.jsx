import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Apply", path: "/apply" }
  ];

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
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white/10 backdrop-blur-2xl p-6 text-white border-r border-white/20 shadow-xl flex flex-col justify-between">

      {/* Top */}
      <div>
        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          Portal
        </h2>

        <ul className="space-y-3">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 
                ${isActive 
                  ? "bg-white/20 text-yellow-300 shadow-md" 
                  : "hover:bg-white/10 hover:translate-x-1"
                }`}
              >
                <span className="font-medium">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-all duration-300"
        >
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

export default Sidebar;