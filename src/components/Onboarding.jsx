// src/components/Onboarding.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitUserData } from './apiHandler';

export default function Onboarding() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    home_address: '',
    work_address: '',
    age: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      name: formData.name,
      city: formData.city,
      homeAddress: formData.home_address,
      workSchoolAddress: formData.work_address,
      age: formData.age,
    };

    const searchResults = await submitUserData(formattedData, navigate, setSearchResults);
    console.log("Search Results Returned from submitUserData:", searchResults);
  };

  return (
    <div className="mt-8 p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tell us about yourself</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="city">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="home_address">
            <span className="label-text">Home Address</span>
          </label>
          <input
            type="text"
            id="home_address"
            name="home_address"
            value={formData.home_address}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="work_address">
            <span className="label-text">Interests</span>
          </label>
          <input
            type="text"
            id="work_address"
            name="work_address"
            value={formData.work_address}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label" htmlFor="age">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Let's Go!
        </button>
      </form>
    </div>
  );
}
