// components/ApplicationsTable.jsx

function ApplicationsTable({ applications }) {

  const getStatusStyle = (status) => {
    if (status === "approved")
      return "bg-green-500/20 text-green-300 border-green-400/30";

    if (status === "rejected")
      return "bg-red-500/20 text-red-300 border-red-400/30";

    return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
           Applied Students
        </h2>

        <span className="text-sm text-white/60">
          Total: {applications.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">

          <thead>
            <tr className="text-white/70 border-b border-white/20">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Enrollment</th>
              <th className="p-3 text-left">CGPA</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Preferences</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Allotted</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-b border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                {/* Name */}
                <td className="p-3 font-medium text-white">
                  {app.studentId?.name}
                </td>

                {/* Enrollment */}
                <td className="p-3 text-white/70">
                  {app.studentId?.enrollmentNo}
                </td>

                {/* CGPA */}
                <td className="p-3 text-white">
                  <span className="px-2 py-1 rounded bg-white/10">
                    {app.cgpa}
                  </span>
                </td>

                {/* Category */}
                <td className="p-3 text-white/80">
                  {app.category}
                </td>

                {/* Preferences */}
                <td className="p-3 text-white/70 max-w-[200px] truncate">
                  {app.preferences?.join(" → ")}
                </td>

                {/* Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${getStatusStyle(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </td>

                {/* Allotted */}
                <td className="p-3 text-white">
                  {app.allottedBranch || "-"}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ApplicationsTable;