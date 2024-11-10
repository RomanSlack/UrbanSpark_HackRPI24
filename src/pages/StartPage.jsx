// src/components/StartPage.js
import React from 'react';
import { Navbar } from '../components/navbar';
import UserForm from '../components/UserForm';

function StartPage() {
  return (
    <div className="no-scroll"> {/* Custom class to prevent vertical scroll */}
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <main className="flex flex-col items-center mt-10"> {/* Reduced top margin */}
          <UserForm />
        </main>
      </div>
    </div>
  );
}

export default StartPage;
