import { MOVIE_IMG_URL_PATH } from '../utils/constants'

const MovieCard = ({ posterPath }) => {
  return (
    <div className="flex-shrink-0 snap-start relative"> {/* ✅ Ensures card doesn't shrink and snaps in scroll */}
      <img
        alt="movieCard"
        src={MOVIE_IMG_URL_PATH + posterPath}
        className="w-32 md:w-40 lg:w-52 aspect-[2/3] object-cover pr-4 rounded-md shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
      />
    </div>
  );
};

export default MovieCard;

// to access poster of each image, we have boiler plate url path + unique key for each image