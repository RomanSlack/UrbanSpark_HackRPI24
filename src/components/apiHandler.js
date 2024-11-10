// src/apiHandler.js

import Query from '../Ai';

export const submitUserData = async (formattedData) => {
  try {
    // Get queries from GPT based on the user data
    const querysFromGPT = await Query(formattedData);
    let parsedQueries;

    if (typeof querysFromGPT === "string") {
      try {
        parsedQueries = JSON.parse(querysFromGPT);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    } else {
      parsedQueries = querysFromGPT;
    }

    if (parsedQueries && Array.isArray(parsedQueries.queries)) {
      // Call handleSearch and return the search results
      return await handleSearch(parsedQueries.queries);
    } else {
      console.error("Error: parsedQueries.queries should be an array of strings.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
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
    console.log("Data from FastAPI:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
