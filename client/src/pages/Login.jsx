import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaLock,
  FaSignInAlt
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    enrollmentNo: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      // login → cookie automatically set
      await API.post("/auth/login", form);

      // fetch user profile
      const userRes = await API.get("/auth/profile");

      if (userRes.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 relative overflow-hidden">

      {/* Background Blur Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>

      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">

        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl mb-3">
            <FaSignInAlt />
          </div>

          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-white/70 text-sm mt-2">
            Login to continue
          </p>
        </div>

        <div className="space-y-5">

          {/* Enrollment */}
          <div className="relative">
            <FaUserGraduate className="absolute left-3 top-4 text-white/70" />

            <input
              type="text"
              placeholder="Enrollment Number"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white border border-white/20 outline-none focus:ring-2 focus:ring-white/40 placeholder:text-white/60"
              onChange={(e) =>
                setForm({ ...form, enrollmentNo: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-white/70" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 p-3 rounded-lg bg-white/20 text-white border border-white/20 outline-none focus:ring-2 focus:ring-white/40 placeholder:text-white/60"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <span
              className="absolute right-3 top-4 cursor-pointer text-white/70 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-indigo-700 font-semibold p-3 rounded-lg hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaSignInAlt />

            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-white mt-5 text-sm">
          New here?{" "}
          <span
            className="underline cursor-pointer hover:text-indigo-200"
            onClick={() => navigate("/")}
          >
            Create account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;