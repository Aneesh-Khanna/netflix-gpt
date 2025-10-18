import { MOVIE_IMG_URL_PATH } from '../utils/constants'
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const MovieCard = ({ posterPath,movieId,title, overview}) => {
  const navigate = useNavigate();
    const handlePlayClick = () => {
      if (movieId) {
        navigate(`/watch/${movieId}`);
      }
  }; // navigate to watch page

  return (
    <div onClick={handlePlayClick} className="flex-shrink-0 snap-start cursor-pointer relative group"> {/* ✅ Ensures card doesn't shrink and snaps in scroll */}
    {/* group ensures Enables hover targeting for child elements,Makes the entire card clickable*/}
      <img
        alt="movieCard"
        src={MOVIE_IMG_URL_PATH + posterPath}
        className="w-32 md:w-40 lg:w-52 aspect-[2/3] object-cover rounded-md shadow-xl transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:border-[1.5px] group-hover:border-gray-600"
      />

      {/* Play Button Overlay */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-black/60 p-3 rounded-full shadow-md hover:scale-110 transition-transform">
        <Play size={24} strokeWidth={1.5} className="text-white" />
      </div>
    </div>

    {/* Hover Description Overlay */}
    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end rounded-md">
      <h3 className="text-sm md:text-base font-semibold text-white mb-1 line-clamp-1">{title}</h3>
      <p className="text-xs text-gray-300 line-clamp-3">{overview}</p>
    </div>

    </div>
  );
};

export default MovieCard;

// to access poster of each image, we have boiler plate url path + unique key for each image