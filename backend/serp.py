# serpservice.py

from serpapi import GoogleSearch  # Ensure you import GoogleSearch correctly
from typing import List

api_key = "8f0f7e61794200e4c5eda13abda9e8144ddfd7f655dad5ca45177feff6b0e1a3"

def fetch_search_results(data: dict) -> List[dict]:
    results_list = []

    # Iterate over each query in the 'queries' array within the input data
    for query in data.get("queries", []):
        params = {
            "engine": "google",
            "q": query,
            "api_key": api_key
        }

        try:
            # Execute the search using SerpApi
            search = GoogleSearch(params)
            results = search.get_dict()

            # Process the first result if available
            if "organic_results" in results and results["organic_results"]:
                first_result = results["organic_results"][0]
                title = first_result.get("title", "No title available")
                link = first_result.get("link", "No link available")
                description = first_result.get("snippet", "No description available")

                # Append to results list
                results_list.append({
                    "query": query,
                    "title": title,
                    "link": link,
                    "description": description
                })
            else:
                # Handle case where no results are found
                results_list.append({
                    "query": query,
                    "title": "No results found",
                    "link": "N/A",
                    "description": "N/A"
                })

        except Exception as e:
            # Handle and log any error
            results_list.append({
                "query": query,
                "title": "Error occurred",
                "link": "N/A",
                "description": str(e)
            })

    return results_list
