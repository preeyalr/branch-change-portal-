// components/SeatForm.jsx

import { useState } from "react";

function SeatForm({ seatForm, setSeatForm, addSeat }) {
  const [loading, setLoading] = useState(false);

  const handleAddSeat = async () => {
    if (!seatForm.branch || !seatForm.category || !seatForm.count) {
      return alert("Please fill all fields ");
    }

    setLoading(true);
    await addSeat();
    setLoading(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 mb-8 transition hover:shadow-2xl">

      {/* Header */}
      <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
         Add Vacant Seats
      </h2>

      {/* Form */}
      <div className="grid md:grid-cols-4 gap-4">

        {/* Branch */}
        <select
          value={seatForm.branch}
          onChange={(e) =>
            setSeatForm({ ...seatForm, branch: e.target.value })
          }
          className="p-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-white/40 transition"
        >
          <option value="" className="text-black">Branch</option>
          <option value="CSE" className="text-black">CSE</option>
          <option value="IT" className="text-black">IT</option>
          <option value="ECE" className="text-black">ECE</option>
          <option value="ME" className="text-black">ME</option>
          <option value="CE" className="text-black">CE</option>
        </select>

        {/* Category */}
        <select
          value={seatForm.category}
          onChange={(e) =>
            setSeatForm({ ...seatForm, category: e.target.value })
          }
          className="p-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-white/40 transition"
        >
          <option value="" className="text-black">Category</option>
          <option value="General" className="text-black">General</option>
          <option value="OBC" className="text-black">OBC</option>
          <option value="SC" className="text-black">SC</option>
          <option value="ST" className="text-black">ST</option>
        </select>

        {/* Count */}
        <input
          type="number"
          value={seatForm.count}
          placeholder="No. of Seats"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-white/40 transition"
          onChange={(e) =>
            setSeatForm({ ...seatForm, count: e.target.value })
          }
        />

        {/* Button */}
        <button
          onClick={handleAddSeat}
          disabled={loading}
          className="bg-blue-500/80 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          {loading ? "Adding..." : "Add Seats"}
        </button>

      </div>

      {/* Hint */}
      <p className="text-white/60 text-sm mt-4">
        Add seats before running allocation
      </p>

    </div>
  );
}

export default SeatForm;