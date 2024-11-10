// src/api/apiHandler.js
import axios from 'axios';
import Query from './Ai';
// import Query2 from '../FinalOutputAi';

export const GPTHandler = async (formData, setSearchResults) => {
  try {
    console.log("Submitted Data:", formData);

    // Step 1: Generate queries from the user data
    const querysFromGPT = await Query(formData);
    console.log("Queries from Query1:", querysFromGPT);

    let parsedQueries;
    if (typeof querysFromGPT === "string") {
      try {
        parsedQueries = JSON.parse(querysFromGPT); // Parse if string
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
    } else {
      parsedQueries = querysFromGPT; // Use directly if already an object
    }

    // Step 2: Ensure parsedQueries is correctly formatted and call handleSearch
    if (parsedQueries && Array.isArray(parsedQueries.queries)) {
      const dataFromSearchAPI = await handleSearch(parsedQueries.queries, setSearchResults);
      console.log("Data from Search API:", dataFromSearchAPI);

      // Step 3: Summarize data (uncomment if Query2 is available)
      // const summarizedData = Query2(dataFromSearchAPI);
      // console.log("Summarized Data:", summarizedData);

      // Return search results data
      return dataFromSearchAPI;
    } else {
      console.error("Error: parsedQueries.queries should be an array of strings.");
      return null;
    }
  } catch (error) {
    console.error("Error in submitUserData:", error);
    return null;
  }
};

// Function to call the FastAPI backend for SerpAPI search
const handleSearch = async (queriesArray, setSearchResults) => {
  console.log("Queries Array being sent:", queriesArray);
  try {
    const response = axios.post('search/', {queries: queriesArray})

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setSearchResults(data.results);
    return data.results; // Return search results
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
};
