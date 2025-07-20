import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
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
        // console.log('Signup Data:', formData);

        try {
            const res = await axios.post(
                "http://localhost:3000/user/api/signup",  // backend port, not 5173
                formData,
                { withCredentials: true }
            );
            console.log("Signup successful:", res.data);
            // Optionally reset form or redirect
            navigate("/login")
            setFormData({
                username: '',
                password: '',
                mobile: '',
                email: '',
                state: '',
                city: ''
            });
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 to-blue-300 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl hover:shadow-blue-400 transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {['username', 'password', 'mobile', 'email', 'state', 'city'].map((field) => (
                        <input
                            key={field}
                            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-transform"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
