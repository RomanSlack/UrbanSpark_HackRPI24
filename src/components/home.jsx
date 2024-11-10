// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FadeTransition from './FadeTransition';

function Home() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleBeginClick = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/start'), 500);
  };

  // Custom cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative">
     {/* <Navbar />*/}
      <FadeTransition in={!isExiting}>
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-red-600 overflow-hidden cursor-none">
          
          {/* Custom Cursor */}
          <div
            className="pointer-events-none fixed rounded-full bg-white opacity-100 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '20px',
              height: '20px',
              top: cursorPosition.y,
              left: cursorPosition.x,
              transition: 'transform 0.1s ease, opacity 0.15s ease',
            }}
          ></div>

          {/* Floating Decorative Circles with Breathing Effect */}
    <div className="absolute top-10 right-20 w-32 h-32 bg-red-500 opacity-20 rounded-full animate-slowBreath"></div>
    <div className="absolute top-40 left-16 w-20 h-20 bg-red-400 opacity-25 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-20 left-32 w-28 h-28 bg-red-600 opacity-15 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-40 right-40 w-24 h-24 bg-red-700 opacity-20 rounded-full animate-slowBreath"></div>
    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-red-500 opacity-30 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-10 left-10 w-36 h-36 bg-red-400 opacity-10 rounded-full animate-slowBreath"></div>

    {/* Additional Circles for a Fuller Effect */}
    <div className="absolute top-5 left-10 w-14 h-14 bg-red-600 opacity-20 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-5 right-16 w-20 h-20 bg-red-500 opacity-15 rounded-full animate-slowBreath"></div>
    <div className="absolute top-20 right-10 w-12 h-12 bg-red-400 opacity-25 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-red-600 opacity-10 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-1/2 left-1/3 w-16 h-16 bg-red-700 opacity-30 rounded-full animate-slowBreath"></div>
    <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-red-500 opacity-20 rounded-full animate-slowBreath"></div>

    {/* New Additional Circles */}
    <div className="absolute top-2 right-5 w-10 h-10 bg-red-500 opacity-20 rounded-full animate-slowBreath"></div>
    <div className="absolute top-14 left-40 w-18 h-18 bg-red-600 opacity-15 rounded-full animate-slowBreath"></div>
    <div className="absolute top-28 right-32 w-14 h-14 bg-red-700 opacity-25 rounded-full animate-slowBreath"></div>
    <div className="absolute top-1/3 left-1/5 w-22 h-22 bg-red-400 opacity-20 rounded-full animate-slowBreath"></div>
    <div className="absolute bottom-1/4 right-1/5 w-26 h-26 bg-red-500 opacity-10 rounded-full animate-slowBreath"></div>
    <div className="absolute top-1/6 left-1/3 w-18 h-18 bg-red-700 opacity-30 rounded-full animate-slowBreath"></div>
    <div className="absolute top-2 right-1/6 w-12 h-12 bg-red-600 opacity-25 rounded-full animate-slowBreath"></div>

          
          
          {/* Home Screen Content */}
          <main className="flex flex-col items-center mt-20 z-10">
            <h1 className="text-6xl font-bold text-white drop-shadow-lg tracking-wider">
              CitySync
            </h1>
            <p className="text-lg text-gray-200 mt-4 max-w-md">
              Helping students become community members and find essential resources.
            </p>

            {/* Floating Begin Button with Glowing Border */}
            <button
              onClick={handleBeginClick}
              className="relative mt-8 px-10 py-4 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur-lg opacity-75 animate-pulse"></span>
              <span className="relative">Begin</span>
            </button>


          </main>

          
        </div>
      </FadeTransition>
    </div>
  );
}

export default Home;
