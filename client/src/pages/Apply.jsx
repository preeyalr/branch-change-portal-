import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Apply() {
  const navigate = useNavigate();

const [form, setForm] = useState({
  currentBranch: "",
  cgpa: "",
  category: "",
  previousAllottedCategory: "",
  preferences: ["", "", ""]
});

  const [loading, setLoading] = useState(false);

  const branches = ["CSE", "IT", "ECE", "ME", "CE", "EE", "EI", "IP", "BIO"];
  const categories = ["General", "OBC", "SC", "ST"];
  const allottedOptions = ["Yes", "No"];

  const handlePreferenceChange = (index, value) => {
    const updated = [...form.preferences];
    updated[index] = value;
    setForm({ ...form, preferences: updated });
  };

  const handleApply = async () => {
    setLoading(true);

    try {
      if (form.cgpa < 7) {
        setLoading(false);
        return alert("Minimum CGPA required is 7 ");
      }

      await API.post("/application/apply", form);

      alert("Application submitted ");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Error ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 relative overflow-hidden p-4">

      {/* 🔥 Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-5 left-5 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
      >
        ← Dashboard
      </button>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 transition hover:scale-[1.01]">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Apply for Branch Change 
        </h2>

        <div className="space-y-5">

          {/* Current Branch */}
          <select
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-white/40"
            onChange={(e) =>
              setForm({ ...form, currentBranch: e.target.value })
            }
          >
            <option value="" className="text-black">Select Current Branch</option>
            {branches.map((b) => (
              <option key={b} className="text-black">{b}</option>
            ))}
          </select>

          {/* CGPA */}
          <input
            type="number"
            step="0.01"
            placeholder="CGPA"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/20 focus:ring-2 focus:ring-white/40"
            onChange={(e) =>
              setForm({ ...form, cgpa: e.target.value })
            }
          />

          {/* Category */}
          <select
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-white/40"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="" className="text-black">Select Category</option>
            {categories.map((c) => (
              <option key={c} className="text-black">{c}</option>
            ))}
          </select>

          {/* Previously Allotted */}
        <select
  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/20"
  onChange={(e) =>
    setForm({ ...form, previousAllottedCategory: e.target.value })
  }
>
  <option value="" className="text-black">Previous Allotted Category</option>
  <option value="General" className="text-black">General</option>
  <option value="OBC" className="text-black">OBC</option>
  <option value="SC" className="text-black">SC</option>
  <option value="ST" className="text-black">ST</option>
</select>

          {/* Preferences */}
          <div>
            <p className="text-white font-semibold mb-2">
              Branch Preferences:
            </p>

            <div className="space-y-3">
              {form.preferences.map((pref, i) => (
                <div key={i} className="flex gap-2 items-center">

                  <span className="text-white font-semibold">{i + 1}.</span>

                  <select
                    className="flex-1 p-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-white/40"
                    onChange={(e) =>
                      handlePreferenceChange(i, e.target.value)
                    }
                  >
                    <option value="" className="text-black">Select Branch</option>
                    {branches.map((b) => (
                      <option key={b} className="text-black">{b}</option>
                    ))}
                  </select>

                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleApply}
            disabled={loading}
            className="w-full mt-4 bg-white text-purple-700 font-semibold p-3 rounded-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? "Submitting..." : "Submit Application "}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Apply;