// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Skills from './components/Skills';
import SocialLinks from './components/SocialLinks';

function App() {
  const myName = "Safiy Ullah Memon";
  const myBio = "A passionate Frontend Developer specializing in creating engaging and efficient web experiences. Always learning and building.";
  const mySkills = ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Git', 'Problem Solving', 'Responsive Design'];
  const myGitHubUrl = "https://github.com/SafiyullahMemon";
  const myLinkedInUrl = "https://www.linkedin.com/in/safiy-ullah-memon-58b92725b";

  return (
    // Outer container: Overall page background is dark gray
    <div className="min-h-screen bg-gray-900 flex justify-center p-8 font-sans">
      {/* Inner card: Slightly lighter dark gray background for contrast */}
      <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-screen-xl text-center transform hover:scale-105 transition-transform duration-300">
        
        <Header name={myName} bio={myBio} />
        <Skills skills={mySkills} />
        <SocialLinks githubUrl={myGitHubUrl} linkedinUrl={myLinkedInUrl} />

      </div>
    </div>
  );
}

export default App;