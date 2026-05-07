// pages/Dashboard.jsx

import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import ApplicationCard from "../components/ApplicationCard";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="animate-pulse text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 text-white relative z-10">

        {/* Header */}
        <div className="mb-8 transition-all duration-500 animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-wide">
            Welcome, <span className="text-yellow-300">{user.name}</span> 
          </h1>
          <p className="text-white/70 mt-2">
            Here’s your branch change overview
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="transition transform hover:scale-[1.02] duration-300">
            <ProfileCard user={user} />
          </div>

          <div className="transition transform hover:scale-[1.02] duration-300">
            <ApplicationCard application={application} />
          </div>

        </div>

        {/* Summary */}
        <div className="mt-6 transition-all duration-500 animate-fadeIn">
          <SummaryCard application={application} />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;