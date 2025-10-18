import { TMDB_API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react"

const VideoBackground = ({ movieId }) => {
  const [trailer, setTrailer] = useState(null);

  //Get videos of a movie
  const videoDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      TMDB_API_OPTIONS
    );
    const json = await data.json();

    // Get the videos of movies which has type trailer, json.results is array of movie objects
    const filterTrailer = json.results.filter(
      (video) => video.type === "Trailer"
    );

    //There are multiple trailers , pick one trailer(first one)
    // handle case where we found no trailer
    const pickedTrailer =
      filterTrailer.length > 0 ? filterTrailer[0] : json.results[0];

    setTrailer(pickedTrailer);
    // Store trailer Id in state variable so that we can use it below
  };

  useEffect(() => {
    videoDetails();
  }, [movieId]); // ✅ refetch if movie changes

  return (
    <div className="absolute inset-0 w-screen h-screen overflow-hidden -z-10">
    {trailer ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full scale-[1.15] translate-x-[3%]"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${trailer.key}`}
        title="YouTube video player"
        allow="autoplay; encrypted-media; fullscreen"
      />
    </div>
  ) : (
    <p className="text-white">Loading trailer...</p>
  )}
    </div>
  );
};

export default VideoBackground;