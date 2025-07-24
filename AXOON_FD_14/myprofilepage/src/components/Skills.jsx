// src/components/Skills.jsx
import React from 'react';

const Skills = ({ skills }) => {
  return (
    // Skills section background is a darker gray for contrast
    <div className="mb-10 bg-gray-700 p-6 rounded-lg shadow-inner">
      {/* Skills heading is white */}
      <h2 className="text-3xl font-bold text-white mb-5">My Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            // Skill tags have a dark indigo background with white text
            className="bg-indigo-600 text-white text-base font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-indigo-700 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;