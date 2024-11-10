import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../api';
import Query from '../Ai';
//import Query2 from '../FinalOutputAi';

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

  const handleSearch = async (queriesArray) => {
    console.log("Queries Array being sent:", queriesArray);
    try {
      const response = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queries: queriesArray }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.results);
      console.log("Data from FastAPI:", data.results);

      return data.results;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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

    console.log("Submitted Data:", formattedData);

    // Fetch generated queries from the first AI function
    const querysFromGPT = await Query(formattedData);
    console.log("Queries from Query1:", querysFromGPT);
    console.log("Type of querysFromGPT:", typeof querysFromGPT);

    // Parse if needed and handle as an array
    let parsedQueries;
    if (typeof querysFromGPT === "string") {
      try {
        parsedQueries = JSON.parse(querysFromGPT);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      parsedQueries = querysFromGPT;
    }

    // Check if parsedQueries is in the expected format and pass to handleSearch
    if (parsedQueries && Array.isArray(parsedQueries.queries)) {
      const dataFromSearchAPI = await handleSearch(parsedQueries.queries);


      console.log(typeof dataFromSearchAPI);

      
      //const summarizedData = Query2(formattedData,dataFromSearchAPI);
     
      //console.log("Summarized Data:", summarizedData);
    } else {
      console.error("Error: parsedQueries.queries should be an array of strings.");
    }

    navigate('/loading');  // Assuming this is the correct next page
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
