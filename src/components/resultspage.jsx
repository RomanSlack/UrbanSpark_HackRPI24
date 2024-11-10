// src/components/ResultsPage.js

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar } from './navbar';

export default function ResultsPage() {
  const location = useLocation();
  const { searchResults } = location.state || {};
  const [activeCategory, setActiveCategory] = useState(null);

  if (!searchResults) {
    return <div className="text-center mt-20 text-lg text-gray-600">No search results available.</div>;
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const categoryColors = [
    "bg-red-400 hover:bg-red-500",
    "bg-green-400 hover:bg-green-500",
    "bg-yellow-400 hover:bg-yellow-500",
    "bg-purple-400 hover:bg-purple-500",
  ];

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Search Results</h2>

        {/* Category Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {Object.keys(searchResults).map((category, index) => {
            const color = categoryColors[index % categoryColors.length];
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`transition-all duration-300 ease-in-out transform hover:scale-105 p-4 rounded-lg font-semibold text-white ${color} ${
                  activeCategory === category ? 'border-4 border-blue-600' : ''
                } focus:outline-none shadow-lg`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Results Display */}
        {activeCategory && (
          <div className="mb-8 animate-fadeIn">
            <h3 className="text-3xl font-semibold mb-4 text-center text-gray-800">{activeCategory}</h3>
            <ul className="space-y-4">
              {searchResults[activeCategory].map((result, index) => (
                <li
                  key={index}
                  className="bg-white p-4 shadow-lg rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300 ease-in-out"
                  >
                    <h4 className="text-xl font-bold">{result.title}</h4>
                  </a>
                  <p className="text-gray-700 mt-2">{result.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
