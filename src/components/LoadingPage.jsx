// LoadingPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start fade-out animation after 2.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Navigate to another page after 3 seconds
    const navigateTimer = setTimeout(() => {
      navigate('/opportunity'); // Replace '/destination' with your desired route
    }, 3000);

    // Clear timeouts if the component unmounts
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100 flex-col transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
