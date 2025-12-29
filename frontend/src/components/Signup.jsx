import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { fullName, username, password, confirmPassword } = user;

    if (!fullName || !username || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${
          process.env.REACT_APP_BASE_URL || "http://localhost:8080"
        }/api/v1/user/register`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        navigate("/login");
        setUser({
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
          gender: "male",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-zinc-800 bg-opacity-60 backdrop-blur-md border border-zinc-700">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              value={user.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              value={user.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              type="text"
              placeholder="Choose a username"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={user.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              type="password"
              placeholder="Enter a password"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={() => handleInputChange("gender", "male")}
                  className="radio radio-sm checked:bg-blue-500"
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={() => handleInputChange("gender", "female")}
                  className="radio radio-sm checked:bg-pink-500"
                />
                Female
              </label>
            </div>
          </div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 text-white font-semibold transition"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
