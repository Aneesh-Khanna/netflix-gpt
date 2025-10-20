import React from 'react';
import GptSearchBar from './GptSearchBar';
import { useSelector } from "react-redux";

const GptSearch = () => {
  // Access current theme from Redux store
  
  const theme = useSelector((store) => store.config.theme);

  return (
    // Full-page container with theme-aware background and text color
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      {/* Main content area with top padding*/}
      <div className="pt-12 px-4 sm:px-6">
        <GptSearchBar />
      </div>
    </div>
  );
};

export default GptSearch;