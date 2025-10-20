import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";


const MovieList = ({ title, movies , origin = "browse" }) => {
  const theme = useSelector((store) => store.config.theme);
  return (
    <div className="px-6">
      {/*Movie List Title*/}
      <h1
      className={`text-lg font-semibold mb-2 ${
      theme === 'dark' ? 'text-white' : 'text-black'
      }`}
      >
      {title}
      </h1>


      {/*Movie List Card Container*/}

      {/* ✅ Wrap scroll container in relative div to allow fade masks */}
      <div className="relative">
        {/* ✅ Left fade mask for Netflix-style scroll polish */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* ✅ Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* ✅ Scroll container with custom scrollbar-hide class */}
        <div className="flex overflow-x-auto gap-6 px-4 py-2 scrollbar-hide snap-x snap-mandatory relative z-0">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} movieId={movie.id} title={movie.title} overview={movie.overview} origin={origin}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

// Why it happens
// When React first renders your component:
// Your Redux store may not yet have the movie data (because it's fetched asynchronously).
// So store.movies?.nowPlayingMovies could be null or undefined initially.
// Then if you try to do something like nowPlayingMovies[0] → 💥 crash.

// 2. What happens on the first render
// Redux state = empty (no movies yet).
// nowPlayingMovies = undefined.
// if (!nowPlayingMovies) is true, so React returns <p>Loading...</p>.
// ✅ That’s the end of this render cycle.
// Anything after that return is not executed in this render.

// 3. Then Redux updates (API data arrives)
// Redux dispatches an action → state changes → React re-renders this component.
// Now nowPlayingMovies has an array of movies.
// if (!nowPlayingMovies) is false, so React skips the first return.
// It continues to the next return (...) that renders your movie list.
// ✅ This is a new render cycle, not a continuation of the old one.

// 4. Why code "after that" still runs
// Because React doesn’t call your function once.
// It calls it again and again whenever state/props/context change.