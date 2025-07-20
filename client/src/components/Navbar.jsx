import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiUser } from 'react-icons/fi';
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/api/getUser", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-violet-500 to-purple-700 text-white shadow-xl px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200">
        <img src="/localityhub.png" alt="LocalityHub" width={250} />
      </Link>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {user ? (<>
          <Link to="/services" 
          className=''
          >
            Services
          </Link>
          <Link
            to="/profile"
            className="hover:text-gray-200 transition"
            title="Profile"
          >
            <FiUser className="text-2xl" />
          </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 font-semibold transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-violet-800 rounded-md hover:bg-violet-400 font-semibold transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
