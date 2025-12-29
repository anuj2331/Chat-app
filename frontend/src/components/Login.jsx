
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const res = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL || 'http://localhost:8080'}/api/v1/user/login`,
      //   user,
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //     withCredentials: true,
      //   }
      // );

          const res = await axios.post(
        `${'https://chat-app-kmo2.onrender.com'}/api/v1/user/login`,
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      dispatch(setAuthUser(res.data));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong, please try again!";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }

    setUser({ username: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-gray-100/10 backdrop-blur-md border border-gray-500/20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
          Login
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
       
          <div>
            <label className="block text-gray-200 mb-1">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter your username"
              required
              className="w-full p-2 sm:p-3 rounded-lg border border-gray-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

     
          <div>
            <label className="block text-gray-200 mb-1">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full p-2 sm:p-3 rounded-lg border border-gray-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

       
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 sm:py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          
          <p className="text-center text-gray-300 mt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline hover:text-blue-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
