import { useState } from "react";
import openai from "../utils/openAI";
import { TMDB_API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/ReduxStore/gptSlice";

// Search movie in TMDB with exact title match
const searchMovieTMDB = async (movie) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
    TMDB_API_OPTIONS
  );
  const json = await data.json();

  //  Filter for exact title match (case-insensitive)
  return json.results.filter((m) =>
    m.title?.toLowerCase() === movie.toLowerCase()
  );
};

const useGptMovieData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Handle GPT search logic
  const fetchGptMovies = async (query) => {
    if (!query) return;

    setIsLoading(true);

    const gptQuery =
      `You are a movie recommendation engine. Based on the user query "${query}", return a list of as many relevant movies as possible that match the tone, region, genre, and era described.\n\n` +
      `Respond ONLY as a JSON array of movie titles. Example: ["Movie1", "Movie2", ..., "MovieN"]\n\n` +
      `Do NOT include any explanation, genre grouping, or extra text. Only return the JSON array.`;

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const movieNames = JSON.parse(gptResults.choices?.[0]?.message?.content || "[]");
    const promiseArray = movieNames.map((movie) => searchMovieTMDB(movie.trim()));
    const tmdbResults = await Promise.all(promiseArray);

    const filteredResults = tmdbResults.map((group) =>
      group?.find((m) => m?.poster_path)
    ).filter(Boolean);

    dispatch(addGptMovieResult({ movieNames: ["Matched Results"], movieResults: [filteredResults] }));
    setIsLoading(false);
  };

  return { isLoading, fetchGptMovies };
};

export default useGptMovieData;