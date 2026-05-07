// components/ApplicationCard.jsx

import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

function ApplicationCard({ application }) {

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return {
        color: "text-green-300",
        bg: "bg-green-500/20",
        border: "border-green-400/30",
        icon: <FaCheckCircle className="text-green-300" />
      };
    }

    if (status === "rejected") {
      return {
        color: "text-red-300",
        bg: "bg-red-500/20",
        border: "border-red-400/30",
        icon: <FaTimesCircle className="text-red-300" />
      };
    }

    return {
      color: "text-yellow-300",
      bg: "bg-yellow-500/20",
      border: "border-yellow-400/30",
      icon: <FaClock className="text-yellow-300" />
    };
  };

  if (!application) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 text-white">
        <h2 className="text-xl font-semibold mb-4">
          Application Status
        </h2>

        <p className="text-white/70">
          No application submitted yet.
        </p>
      </div>
    );
  }

  const status = getStatusStyle(application.status);

  return (
    <div
      className={`p-6 rounded-2xl backdrop-blur-2xl shadow-xl border transition-all duration-300 hover:scale-[1.01] ${status.bg} ${status.border}`}
    >

      {/* Header */}
      <h2 className="text-xl font-semibold mb-5 text-white flex items-center gap-2">
        Application Status
      </h2>

      {/* Status Highlight */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-lg">
          {status.icon}
        </div>

        <p className={`font-semibold capitalize ${status.color}`}>
          {application.status}
        </p>
      </div>

      {/* CGPA Warning */}
      {application.cgpa < 7 && (
        <p className="text-red-300 text-sm mb-3">
          Rejected due to CGPA below cutoff (7.0)
        </p>
      )}

      {/* Details */}
      <div className="space-y-3 text-sm">

        <div className="flex justify-between text-white/80">
          <span>Allotted Branch</span>
          <span className="text-white font-medium">
            {application.allottedBranch || "Not yet"}
          </span>
        </div>

        <div className="flex justify-between text-white/80">
          <span>Category</span>
          <span className="text-white">
            {application.category}
          </span>
        </div>

        <div className="flex flex-col text-white/80">
          <span>Preferences</span>
          <span className="text-white text-sm mt-1">
            {application.preferences?.join(" → ")}
          </span>
        </div>

      </div>

    </div>
  );
}

export default ApplicationCard;