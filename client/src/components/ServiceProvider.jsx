import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ServiceProvider = () => {
  const { serviceId } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      if (!serviceId) return;
      try {
        const res = await axios.get(`http://localhost:3000/user/api/services/${serviceId}`, {
          withCredentials: true,
        });
        setProvider(res.data);
      } catch (err) {
        console.error("Error fetching provider:", err);
      }
    };

    fetchProvider();
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Service Provider Details
        </h2>

        {provider ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 transition-all duration-300">
            <img
              src={provider.imageUrl}
              alt={provider.type}
              className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
            />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4 capitalize">
                {provider.type}
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Description:</span> {provider.description}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Price:</span> ₹{provider.price}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Location:</span> {provider.city}, {provider.state}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No service provider found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceProvider;
