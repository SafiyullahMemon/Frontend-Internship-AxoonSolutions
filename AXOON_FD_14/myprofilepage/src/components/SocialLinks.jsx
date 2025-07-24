// src/components/SocialLinks.jsx
import React from 'react';

const SocialLinks = ({ githubUrl, linkedinUrl }) => {
  return (
    <div>
      {/* Social links heading is white */}
      <h2 className="text-3xl font-bold text-white mb-5">Connect with Me</h2>
      <div className="flex justify-center gap-8">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          // Social link text is light gray, with a brighter blue on hover
          className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center text-lg"
        >
          {/* Using white versions of icons for visibility on dark background */}
          <img src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png" alt="GitHub" className="w-9 h-9 inline-block mr-2"/>
          GitHub
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          // Social link text is light gray, with a brighter blue on hover
          className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center text-lg"
        >
          {/* Using white versions of icons for visibility on dark background */}
          <img src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png" alt="LinkedIn" className="w-9 h-9 inline-block mr-2"/>
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;