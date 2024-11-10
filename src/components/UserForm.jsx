// src/components/UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Query from '../Ai';
import Query2 from '../FinalOutputAi';


function UserForm() {
  const [formData, setFormData] = useState({
    city: '',
    address: '',
    bio: '',
    age: '',
  });
  const [step, setStep] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearch = async (queries) => {


    try {
      const response = await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queries),
      });
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        console.log("Formatted Search Results:", results);
      } else {
        console.error("Error fetching search results:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  // Async function to call fetchSearchResults
  

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();

    const formattedData = `City: ${formData.city}\nAddress: ${formData.address}\nBio: ${formData.bio}\nAge: ${formData.age}`;
    console.log("Submitted Data:", formattedData);
    
    const querysFromGPT = Query(formattedData)
    console.log("Queries from Query1", querysFromGPT);

    const datafromSearchAPI = await handleSearch(querysFromGPT); // Await search to ensure it completes before navigating

    const summarizedData = Query2(datafromSearchAPI)
    console.log("Summarized Data:", summarizedData);

    
    navigate('/opportunity');
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Please fill out the form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Introductory Step */}
        {step === 1 && (
          <div className="flex flex-col space-y-4">
            <p className="text-lg text-gray-700">
              We use this information to personalize your experience and connect you with relevant resources in your city.
              Your data will remain secure and confidential.
            </p>
            <button
              type="button"
              onClick={handleNext}
              className="relative w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 blur-md opacity-75 animate-pulse"></span>
              <span className="relative">Next</span>
            </button>
          </div>
        )}

        {/* Step 2: City and Address */}
        {step === 2 && (
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
            <label className="text-lg font-medium text-gray-700">
              Home Address
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Enter your address"
                required
              />
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="relative w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 blur-md opacity-75 animate-pulse"></span>
              <span className="relative">Next</span>
            </button>
          </div>
        )}

        {/* Step 3: Bio */}
        {step === 3 && (
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-medium text-gray-700">
              Bio
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="A short description about you (Include sports and interests)"
                rows="4"
                required
              />
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="relative w-full mr-2 py-2 rounded-lg font-semibold text-gray-700 bg-gray-300 shadow-lg hover:bg-gray-400 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="relative w-full ml-2 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 blur-md opacity-75 animate-pulse"></span>
                <span className="relative">Next</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Age */}
        {step === 4 && (
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
                className="relative w-full mr-2 py-2 rounded-lg font-semibold text-gray-700 bg-gray-300 shadow-lg hover:bg-gray-400 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                className="relative w-full ml-2 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 blur-md opacity-75 animate-pulse"></span>
                <span className="relative">Submit</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserForm;
