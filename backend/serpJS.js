// Import the SerpApi library
const SerpApi = require('serpapi');

// Set up the API key
const api_key = "8f0f7e61794200e4c5eda13abda9e8144ddfd7f655dad5ca45177feff6b0e1a3";

// Define the function to fetch search results
async function fetchSearchResults(data) {
  const resultsList = [];

  for (const query of data.queries) {
    const params = {
      engine: "google",
      q: query,
      api_key: api_key
    };

    try {
      // Create a SerpApi search instance
      const search = new SerpApi.GoogleSearch(api_key);

      // Run the search with the parameters and await the result
      const results = await new Promise((resolve, reject) => {
        search.json(params, (data) => resolve(data), (error) => reject(error));
      });

      // Check and store the first result if available
      if (results.organic_results && results.organic_results.length > 0) {
        const firstResult = results.organic_results[0];
        const title = firstResult.title || "No title available";
        const link = firstResult.link || "No link available";
        const description = firstResult.snippet || "No description available";

        // Add the result to the results list
        resultsList.push({
          query: query,
          title: title,
          link: link,
          description: description
        });
      } else {
        resultsList.push({
          query: query,
          title: "No results found",
          link: "N/A",
          description: "N/A"
        });
      }

    } catch (error) {
      // Handle errors and add an error message to the results list
      resultsList.push({
        query: query,
        title: "Error occurred",
        link: "N/A",
        description: error.message
      });
    }
  }

  return resultsList;
}

// Example usage with sample data
const sampleData = {
  queries: [
    "Art education opportunities for kids in New York City",
    "Computer science education opportunities for kids in New York City",
    "Internship opportunities for kids interested in painting in New York City",
    "Healthy food options for kids in New York City",
  ]
};

fetchSearchResults(sampleData).then(results => {
  console.log(results);
}).catch(error => {
  console.error("An error occurred:", error);
});
