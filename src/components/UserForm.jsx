// src/components/UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserForm() {
  const [formData, setFormData] = useState({
    city: '',
    bio: '',
    age: '',
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = `City: ${formData.city}\nBio: ${formData.bio}\nAge: ${formData.age}`;
    console.log("Submitted Data:", formattedData); // Output to console

    // Store formatted data in a variable for later use
    const userData = formattedData;
    console.log("Stored User Data:", userData);

    // Redirect to the new blank page
    navigate('/opportunity');
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Please fill out the form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-medium text-gray-700">
              City
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Enter your city"
                required
              />
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-medium text-gray-700">
              Bio
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="A short description about you"
                rows="4"
                required
              />
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-full mr-2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full ml-2 bg-red-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-medium text-gray-700">
              Age
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Enter your age"
                required
              />
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-full mr-2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full ml-2 bg-red-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserForm;
