// components/SummaryCard.jsx

import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartPie
} from "react-icons/fa";

function SummaryCard({ application }) {
  if (!application) return null;

  const getStatus = () => {
    if (application.status === "approved") {
      return {
        text: "You got your preferred branch!",
        color: "text-green-300",
        bg: "bg-green-500/20",
        border: "border-green-400/30",
        icon: <FaCheckCircle className="text-green-300" />
      };
    }

    if (application.status === "pending") {
      return {
        text: "Your application is under review.",
        color: "text-yellow-300",
        bg: "bg-yellow-500/20",
        border: "border-yellow-400/30",
        icon: <FaClock className="text-yellow-300" />
      };
    }

    return {
      text: "No branch allotted.",
      color: "text-red-300",
      bg: "bg-red-500/20",
      border: "border-red-400/30",
      icon: <FaTimesCircle className="text-red-300" />
    };
  };

  const status = getStatus();

  return (
    <div
      className={`mt-8 p-6 rounded-2xl backdrop-blur-2xl shadow-xl border transition-all duration-300 hover:scale-[1.01] ${status.bg} ${status.border}`}
    >

      {/* Header */}
      <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
        <FaChartPie className="text-white" />
        Summary
      </h2>

      {/* Content */}
      <div className="flex items-center gap-4">

        {/* Icon Circle */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-xl shadow-md">
          {status.icon}
        </div>

        {/* Text */}
        <div>
          <p className={`font-medium ${status.color}`}>
            {status.text}
          </p>

          <p className="text-white/60 text-sm mt-1">
            Status: <span className="capitalize">{application.status}</span>
          </p>
        </div>

      </div>

    </div>
  );
}

export default SummaryCard;