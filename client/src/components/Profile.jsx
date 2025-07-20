import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/api/getUser', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Logged In</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => window.location.href = '/login'}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (<>
  <div className='flex w-full'>

  <div className='min-w-[20%] bg-blue-200'>

    <Link to="/create-new-service"
    className=''>
      Service
    </Link>
  </div>
    <div className="min-h-screen min-w-[80%] bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-blue-100">{user.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-sm">
                    {user.city}
                  </span>
                  <span className="px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-sm">
                    {user.state}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Username</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{user.username}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Mobile</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{user.mobile || 'Not provided'}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user.city}, {user.state}
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              {/* <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                Edit Profile
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>);
};

export default Profile;