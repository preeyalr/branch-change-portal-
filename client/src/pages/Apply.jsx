import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom"; 
 


function Apply() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentBranch: "",
    cgpa: "",
    category: "",
    previouslyAllotted: "",
    preferences: ["", "", ""]
  });

  const branches = ["CSE", "IT", "ECE", "ME", "CE", "EE", "EI", "IP", "BIO"];
  const categories = ["General", "OBC", "SC", "ST"];

  const handlePreferenceChange = (index, value) => {
    const updated = [...form.preferences];
    updated[index] = value;
    setForm({ ...form, preferences: updated });
  };

 const handleApply = async () => {
  try {
    // 🔴 CGPA check
    if (form.cgpa < 7) {
      return alert("Minimum CGPA required is 7 ❌");
    }

    await API.post("/application/apply", form);

    alert("Application submitted 🎉");
    navigate("/dashboard");

  } catch (err) {
    alert(err.response?.data?.message || "Error ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
<button
  type="button"
  onClick={() => navigate("/dashboard")}
  className="absolute top-5 left-5 flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-indigo-100 transition duration-200"
>
  <span>←</span>
  <span>Dashboard</span>
</button>
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Branch Change Portal 🎓
        </h2>

        {/* Current Branch */}
        <select
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-black"
          onChange={(e) =>
            setForm({ ...form, currentBranch: e.target.value })
          }
        >
          <option value="">Select Current Branch</option>
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        {/* CGPA */}
        <input
          type="number"
          step="0.01"
          placeholder="CGPA"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-black placeholder-white/70"
          onChange={(e) =>
            setForm({ ...form, cgpa: e.target.value })
          }
        />

        {/* Category */}
        <select
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-black"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Previously Allotted */}
        <select
          className="w-full p-3 mb-6 rounded-lg bg-white/30 text-black"
          onChange={(e) =>
            setForm({ ...form, previouslyAllotted: e.target.value })
          }
        >
          <option value="">Previously Allotted Seat?</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Preferences */}
        <div className="space-y-3">
          <p className="text-white font-semibold mb-2">
            Branch Preferences:
          </p>

          {form.preferences.map((pref, i) => (
            <div key={i} className="flex gap-2 items-center">

              <span className="text-white">{i + 1}.</span>

              <select
                className="flex-1 p-3 rounded-lg bg-white/30 text-black"
                onChange={(e) =>
                  handlePreferenceChange(i, e.target.value)
                }
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleApply}
          className="w-full mt-6 bg-white text-purple-700 font-semibold p-3 rounded-lg hover:bg-purple-100"
        >
          Submit Application 🚀
        </button>

      </div>
    </div>
  );
}

export default Apply;