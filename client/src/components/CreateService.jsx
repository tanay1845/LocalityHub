import React, { useState } from 'react';
import axios from 'axios';

const CreateService = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    price: '',
    state: '',
    city: '',
    providerName: '',
    pincode: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = new FormData();
    serviceData.append('image', image);
    Object.entries(formData).forEach(([key, value]) =>
      serviceData.append(key, value)
    );

    try {
      const res = await axios.post('http://localhost:3000/api/services/create', serviceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      alert('Service created successfully!');
      console.log(res.data)
    } catch (error) {
      console.error(error);
      alert('Failed to create service.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Service Type</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Painting">Painting</option>
          <option value="Pest-control">Pest-control</option>
          <option value="Gas">Gas</option>
          <option value="Water-Prof">Water-Prof</option>
          <option value="Water Purifier">Water Purifier</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="providerName"
          placeholder="Provider Name"
          value={formData.providerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateService;
