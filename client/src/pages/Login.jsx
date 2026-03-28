import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    enrollmentNo: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful 🔐");
     const userRes = await API.get("/auth/profile");

if (userRes.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}

    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Enrollment Number"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            onChange={(e) =>
              setForm({ ...form, enrollmentNo: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-white text-indigo-600 font-semibold p-3 rounded-lg hover:bg-indigo-100 transition"
          >
            Login
          </button>

        </div>

        <p className="text-center text-white mt-4 text-sm">
          New here?{" "}
          <span
            className="underline cursor-pointer"
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