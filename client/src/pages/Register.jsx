import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    enrollmentNo: "",
    password: "",
    role: "student"
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully ");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "User already exists") {
        alert("Already registered → Login ");
        navigate("/login");
      } else {
        alert("Registration failed ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 relative overflow-hidden">

      {/* 🔥 Animated Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transition-all duration-500 hover:scale-[1.02]">

        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Create Account 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Inputs */}
          {["name", "email", "enrollmentNo", "password"].map((field) => (
            <div key={field} className="relative group">

              <input
                type={field === "password" ? "password" : "text"}
                placeholder=" "
                className="peer w-full p-3 rounded-lg bg-white/20 text-white placeholder-transparent outline-none border border-white/20 focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                required
              />

              {/* Floating Label */}
              <label className="absolute left-3 top-3 text-white/70 text-sm transition-all duration-300 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-white
              bg-transparent px-1">

                {field === "enrollmentNo"
                  ? "Enrollment Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>

            </div>
          ))}

          {/* Role */}
          <select
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-white/40 transition"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="student" className="text-black">Student</option>
            <option value="admin" className="text-black">Admin</option>
          </select>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-white text-purple-700 font-semibold p-3 rounded-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? "Creating..." : "Register "}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-white mt-5 text-sm">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-yellow-300 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;