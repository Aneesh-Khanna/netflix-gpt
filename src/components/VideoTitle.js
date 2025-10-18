import React from 'react'
import { Play, Info } from 'lucide-react';


const VideoTitle = ({title,overview}) => {
  return (
     
     <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-24 text-white bg-gradient-to-r from-black via-black/60 to-transparent z-10">
     {/* Whole container */}
     {/* Movie Title */}
      <h1 className="text-xl md:text-4xl font-semibold mb-3 drop-shadow-md">{title}</h1>

      {/* Movie Description */}
      <p className="hidden md:inline-block text-sm text-gray-300 max-w-md leading-snug mb-5">{overview}</p>

      {/*Div containing two buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex items-center gap-2 bg-white/10 text-white font-medium py-2 px-6 rounded-md text-sm hover:bg-white/20 transition duration-200 shadow-sm backdrop-blur-sm">
            <Play size={16} strokeWidth={1.5} />
            <span>Play</span>
        </button>
        <button className="hidden md:flex items-center gap-2 bg-white/10 text-white font-medium py-2 px-6 rounded-md text-sm hover:bg-white/20 transition duration-200 shadow-sm backdrop-blur-sm">
            <Info size={16} strokeWidth={1.5} />
            <span>More Info</span>
        </button>
     </div>
    </div>
  )
}

export default VideoTitle