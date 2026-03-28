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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "User already exists") {
        alert("Already registered → Login 🔐");
        navigate("/login");
      } else {
        alert("Registration failed ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {["name", "email", "enrollmentNo", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              placeholder={
                field === "enrollmentNo"
                  ? "Enrollment Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              required
            />
          ))}
            
        {/* ROLE SELECT */}
        <select
          className="w-full p-2 mb-4 rounded text-black"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
          <button className="w-full bg-white text-purple-600 font-semibold p-3 rounded-lg hover:bg-purple-100 transition">
            Register
          </button>

        </form>

        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
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