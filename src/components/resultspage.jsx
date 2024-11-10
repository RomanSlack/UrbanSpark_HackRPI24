// src/components/ResultsPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultsPage() {
  const location = useLocation();
  const { searchResults } = location.state || {};

  if (!searchResults) {
    return <div>No search results available.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Search Results</h2>
      {Object.keys(searchResults).map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">{category}</h3>
          <ul className="space-y-4">
            {searchResults[category].map((result, index) => (
              <li key={index} className="bg-white p-4 shadow rounded">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <h4 className="text-xl font-bold">{result.title}</h4>
                </a>
                <p>{result.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
