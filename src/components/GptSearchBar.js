import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { addGptMovieResult } from "../utils/ReduxStore/gptSlice";
import GptMovieSuggestions from './GptMovieSuggestions';
import ShimmerMovieRow from '../utils/ShimmerUI_GptPage/ShimmerMovieRow';
import { Search } from "lucide-react";
import useGptMovieData from "../customHooks/useGptMovieData";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.language);
  const theme = useSelector((store) => store.config.theme);
  const searchText = useRef(null);
  const [showToast, setShowToast] = useState(false); // for notification

  //  Custom hook for GPT + TMDB logic
  const { isLoading, fetchGptMovies } = useGptMovieData();

  // ✅ Toast visibility based on loading state
  useEffect(() => {
    if (isLoading) {
    setShowToast(true);  // show toast when loading starts
    } else {
    setShowToast(false); // hide toast when loading ends
    }
    }, [isLoading]);

  // Handle GPT search click
  const handleGptSearchClick = () => {
    const query = searchText.current.value;
    if (!query) return; // Ignore Empty Query, To avoid gpt calls
    fetchGptMovies(query);
  };

  // Clear input and Redux results
  const handleClearClick = () => {
    if (searchText.current) {
      searchText.current.value = "";
      dispatch(addGptMovieResult({ movieNames: [], movieResults: [] }));
    }
  };

  return (
    <div className="pt-[160px] sm:pt-[120px] md:pt-[80px] flex flex-col items-center">
      <form className="w-full grid grid-cols-1 sm:grid-cols-12 gap-y-2 md:w-[60%] rounded-lg overflow-hidden"
            onSubmit={(e) => e.preventDefault()}>

        {/* 🔍 Search Bar */}
        <input ref={searchText} type="text"
          className={`p-2 m-2 col-span-7 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30
                      ${theme === 'dark'
            ? 'bg-white/10 text-white'
            : 'bg-black text-white border border-black'}
          `}
          placeholder={lang[langKey].gptSearchPlaceholder}
        />

        {/* 🚀 Search Button */}
        <button onClick={handleGptSearchClick}
          className={`col-span-2 m-2 py-1 px-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200
                      ${theme === 'dark'
            ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:shadow-md hover:scale-[1.03]'
            : 'bg-black text-white border border-black hover:bg-gray-200 hover:text-black hover:scale-[1.03]'}
          `}>
          <Search className="w-4 h-4" />
          {lang[langKey].search}
        </button>

        {/* 🧹 Clear Button */}
        <button onClick={handleClearClick}
          className={`col-span-3 m-2 py-1 px-3 rounded-md text-sm font-medium transition-all duration-200
                      ${theme === 'dark'
            ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:shadow-md hover:scale-[1.03]'
            : 'bg-black text-white border border-black hover:bg-gray-200 hover:text-black hover:scale-[1.03]'}
          `}>
          ⟳ {lang[langKey].clear}
        </button>
      </form>
      
      {/* Toast Notification while searching */}
      {showToast && (
      <div className="mt-4 flex items-center justify-center w-full">
        <div
        className={`flex items-center gap-3 px-4 py-2 rounded-md shadow-lg w-[60%] md:w-[30%] transition-all duration-300
        ${theme === 'dark'
          ? 'bg-white/10 text-white border border-white/20 backdrop-blur-md'
          : 'bg-black text-white border border-black/10'}
        `}>
          <Search size={18} strokeWidth={2} className="text-white" />
          <span className="text-sm font-medium tracking-wide">
          {lang[langKey].notification}...
          </span>
        </div>
      </div>
      )}

      {/* ✨ Show shimmer while loading, else show results */}
      {isLoading ? <ShimmerMovieRow /> : <GptMovieSuggestions />}
    </div>
  );
};

export default GptSearchBar;

/*
🧠 What is encodeURIComponent(movie)?
This function safely encodes the movie name for use in a URL.
🔧 Example:
If the movie name is:

"Dumb and Dumber"

Then:
encodeURIComponent("Dumb and Dumber")

Returns:
"Dumb%20and%20Dumber"

✅ This prevents issues with spaces, ampersands, quotes, or special characters that would break the URL or cause incorrect API results.
*/