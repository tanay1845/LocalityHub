import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router';

const AllServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/api/services', {
        withCredentials: true,
      });
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Services</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <div
            key={service._id}
            onClick={()=>navigate(`/services/${service._id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={service.imageUrl}
              alt={service.type}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{service.type}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <p className="text-sm text-gray-500 mt-2">Price: ₹{service.price}</p>
              <p className="text-sm text-gray-500">Location: {service.city}, {service.state}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
