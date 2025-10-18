import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";
import Header from "./Header";
import MovieHeading from "./MovieHeading";
import MovieTrailer from "./MovieTrailer";
import MovieDescription from "./MovieDescription";
import MovieMeta from "./MovieMeta";
import PeopleGrid from "./PeopleGrid";

import ShimmerHeading from "../utils/ShimmerUI_Watch/ShimmerHeading";
import ShimmerTrailer from "../utils/ShimmerUI_Watch/ShimmerTrailer";
import ShimmerDescription from "../utils/ShimmerUI_Watch/ShimmerDescription";
import ShimmerMeta from "../utils/ShimmerUI_Watch/ShimmerMeta";
import ShimmerCast from "../utils/ShimmerUI_Watch/ShimmerCast";

const Watch = () => {
  const { movieId } = useParams(); // fetch movieId from URL given through useNavigate hook
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
      try {
        const [videoRes, detailRes, creditRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, TMDB_API_OPTIONS),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, TMDB_API_OPTIONS),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, TMDB_API_OPTIONS),
  ]);

        const videoJson = await videoRes.json();    // video details of movie
        const detailJson = await detailRes.json();  // movie information and description
        const creditJson = await creditRes.json();  // credit information

        const trailerList = videoJson?.results || [];
        const trailer = trailerList.find((v) => v.type === "Trailer");
        setTrailerKey(trailer?.key || trailerList[0]?.key || null);
        setMovieDetails(detailJson);
        setCredits(creditJson); // fetching data from API
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      } // try catch block to handle error and allow handle loading behaviour
    };

    //call API
  useEffect(() => {fetchData();
  }, [movieId]);
 // Run fetchData() every time movieId changes

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="px-6 md:px-24 pt-24 pb-12">
        {loading ? <ShimmerHeading /> : <MovieHeading title={movieDetails?.original_title} tagline={movieDetails?.tagline} />}
        {loading ? <ShimmerTrailer /> : <MovieTrailer trailerKey={trailerKey} />}
        {loading ? <ShimmerDescription /> : <MovieDescription overview={movieDetails?.overview} />}
        {loading ? <ShimmerMeta /> : <MovieMeta details={movieDetails} />}
        {loading ? <ShimmerCast /> : <PeopleGrid cast={credits?.cast} crew={credits?.crew} />}
      </div>
    </div>
  );
};

export default Watch;

{/* watch page 
        -- header
        -- title
        -- video
        -- description meta
        -- cast crew details
 */}