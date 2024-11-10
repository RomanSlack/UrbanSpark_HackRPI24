import serpapi

sampleData = { "Search Queries": [ "Painting classes for kids in New York City", "Art exhibitions for children in New York City", "Computer workshops for kids in New York City", "Coding classes for kids in New York City", "Tech museums in New York City", "Art supplies stores in New York City", "Kids friendly art galleries in New York City", "Educational computer games events in New York City", "Interactive tech exhibits for kids in New York City", "DIY painting activity in New York City" ] }

inputquery = sampleData["Search Queries"][0]
print(inputquery)

api_key =  "8f0f7e61794200e4c5eda13abda9e8144ddfd7f655dad5ca45177feff6b0e1a3"

params = {
   "engine": "google",
   "q": "Volunteering in Rapid City South Dakota",
   "api_key": "8f0f7e61794200e4c5eda13abda9e8144ddfd7f655dad5ca45177feff6b0e1a3"
}

for query in sampleData["Search Queries"]:
    params = {
        "engine": "google",
        "q": query,
        "api_key": api_key
    }

    search = serpapi.search(params)
    results = search

        # Check if there are organic results and print the first one
    if "organic_results" in results and len(results["organic_results"]) > 0:
        first_result = results["organic_results"][0]
        title = first_result.get("title", "No title available")
        link = first_result.get("link", "No link available")
        description = first_result.get("snippet", "No description available")

        print(f"Query: {query}")
        print(f"Title: {title}")
        print(f"Link: {link}")
        print(f"Description: {description}")
        print("=" * 50)  # Separator for readability
    else:
        print(f"No results found for query: {query}")
        print("=" * 50)






print(results)                                                         



#old code 
# for x in range(9):
#    if "organic_results" in results and len(results["organic_results"]) > 0:
#        first_result = results["organic_results"][x]
#        title = first_result.get("title", "No title available")
#        link = first_result.get("link", "No link available")
#        description = first_result.get("snippet", "No description available")


#        print(f"Title: {title}")
#        print(f"Link: {link}")
#        print(f"Description: {description}")
# else:
#    print("No results found.")


