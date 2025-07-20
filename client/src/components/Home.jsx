import React from "react";
import { useNavigate } from "react-router";

const services = [
  { name: "Cleaning", image: "/images/cleaning.jpg" },
  { name: "Gas Repair", image: "/images/gas-repair.jpg" },
  { name: "Water Purifier", image: "/images/water-purifier.jpg" },
  { name: "Plumber", image: "/images/plumber.jpg" },
  { name: "Home Shift", image: "/images/home-shift.jpg" },
  { name: "Camera Service", image: "/images/camera.jpg" },
  { name: "Painting", image: "/images/painting.jpg" },
  { name: "Pest Control", image: "/images/pest.jpg" },
  { name: "Electrician", image: "/images/electrician.jpg" },
  { name: "Water Proofing", image: "/images/waterproof.jpg" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    const formatted = serviceName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/services/${formatted}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose a Service</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service.name)}
            className="cursor-pointer border rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-200"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover"
            />
            <div className="text-center py-2 font-medium">{service.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
