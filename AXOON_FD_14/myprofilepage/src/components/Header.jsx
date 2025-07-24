// src/components/Header.jsx
import React from 'react';
import profilePic from '../assets/profilepic.jpg'; // Ensure this path is correct for your image

const Header = ({ name, bio }) => {
  return (
    <div className="mb-6">
      <img
        src={profilePic}
        alt="Profile"
        // Profile picture border adjusted for dark background
        className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-md"
      />
      {/* Name text is white */}
      <h1 className="text-5xl font-extrabold text-white mt-4 mb-2">
        {name}
      </h1>
      {/* Bio text is light gray */}
      <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
        {bio}
      </p>
    </div>
  );
};

export default Header;