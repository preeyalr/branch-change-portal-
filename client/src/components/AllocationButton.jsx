import { useState } from "react";

function AllocationButton({ runAllocation }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      await runAllocation(); // 🔥 calls API

      alert("Allocation completed ");

    } catch (err) {
      console.error(err);
      alert("Allocation failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={handleClick}
        disabled={loading}
        className="relative bg-green-500/80 text-white font-semibold px-8 py-3 rounded-xl 
        shadow-lg transition-all duration-300 
        hover:bg-green-600 hover:scale-105 active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        <span className="absolute inset-0 bg-green-400 opacity-20 blur-xl rounded-xl"></span>

        <span className="relative z-10">
          {loading ? "Allocating..." : "Run Allocation "}
        </span>
      </button>
    </div>
  );
}

export default AllocationButton;