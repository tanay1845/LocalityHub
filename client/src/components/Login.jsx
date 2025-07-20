import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/user/api/login",
        formData,
        { withCredentials: true }
      );
      console.log('Login Data:', res.data);
      navigate("/")
      setFormData({
        email: '',
        password: '',
      })
    } catch (error) {
      console.log("login failed or server error", error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl hover:shadow-purple-300 transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 active:scale-95 transition-transform"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
