import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ServiceList = () => {
  const { serviceType } = useParams();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(`/api/providers?service=${serviceType}`);
        setProviders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProviders();
  }, [serviceType]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        {serviceType.replace("-", " ")} Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-bold">{provider.name}</h3>
            <p className="text-sm text-gray-600">{provider.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
