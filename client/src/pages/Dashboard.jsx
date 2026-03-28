import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await API.get("/auth/profile");
      setUser(userRes.data);

      const appRes = await API.get("/application/status");
      setApplication(appRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "approved") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    return "bg-yellow-400 text-black";
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700">

      {/* Sidebar */}
      <div className="w-64 bg-white/20 backdrop-blur-lg p-6 text-white border-r border-white/30">
        <h2 className="text-2xl font-bold mb-8">🎓 Portal</h2>

        <ul className="space-y-4">
          <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
          <li
            className="hover:text-yellow-300 cursor-pointer"
            onClick={() => (window.location.href = "/apply")}
          >
            Apply
          </li>
          <li
            className="hover:text-red-300 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 text-white">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user.name} 👋
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Profile Card */}
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
            <h2 className="text-xl font-semibold mb-4">👤 Profile</h2>

            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Enrollment:</strong> {user.enrollmentNo}</p>
             
            </div>
          </div>

          {/* Application Card */}
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
            <h2 className="text-xl font-semibold mb-4">
              📄 Application Status
            </h2>

            {!application ? (
              <p>No application submitted</p>
            ) : (
              <div className="space-y-3">
<p>
  <strong>Status:</strong> {application.status}
</p>

{application.cgpa < 7 && (
  <p className="text-red-300">
    ❌ Rejected due to CGPA below cutoff (7.0)
  </p>
)}

                <p>
                  <strong>Allotted Branch:</strong>{" "}
                  {application.allottedBranch || "Not yet allotted"}
                </p>

                <p>
                  <strong>Preferences:</strong>{" "}
                  {application.preferences?.join(" → ")}
                </p>

                <p>
                  <strong>Category:</strong> {application.category}
                </p>

              </div>
            )}
          </div>

        </div>

        {/* Summary Section */}
        {application && (
          <div className="mt-8 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
            <h2 className="text-lg font-semibold mb-3">📊 Summary</h2>

            <p>
              {application.status === "approved"
                ? "🎉 You got your preferred branch!"
                : application.status === "pending"
                ? "⏳ Your application is under review."
                : "❌ No branch allotted."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;