from serpapi import GoogleSearch  # Import GoogleSearch directly
from typing import List

# Set up the API key
api_key = "2bc4d08d3cdaac43b8a51918b598490a842832827fe00600a0b592a81ab6c37a"
def fetch_search_results(data: dict) -> List[dict]:
    results_list = []

    for query in data["queries"]:
        params = {
            "engine": "google",
            "q": query,
            "api_key": api_key
        }

        try:
            # Create a GoogleSearch instance and pass the params
            search = GoogleSearch(params)
            results = search.get_dict()  # Get results as a dictionary

            # Check and store the first result if available
            if "organic_results" in results and results["organic_results"]:
                first_result = results["organic_results"][0]
                title = first_result.get("title", "No title available")
                link = first_result.get("link", "No link available")
                description = first_result.get("snippet", "No description available")

                # Add the result to the results list
                results_list.append({
                    "query": query,
                    "title": title,
                    "link": link,
                    "description": description
                })
            else:
                results_list.append({
                    "query": query,
                    "title": "No results found",
                    "link": "N/A",
                    "description": "N/A"
                })

        except Exception as e:
            # Handle errors and add an error message to the results list
            results_list.append({
                "query": query,
                "title": "Error occurred",
                "link": "N/A",
                "description": str(e)
            })

    return results_list
