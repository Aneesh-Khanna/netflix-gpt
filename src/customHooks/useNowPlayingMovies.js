import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../utils/constants"
import { addNowPlayingMovies } from "../utils/ReduxStore/movieSlice";
import { useEffect } from "react";

//custom hook - use now playing movies
const useNowPlayingMovies = ()=>{

// Fetch data from TMDB API and update the store .

  const dispatch = useDispatch(); // dispatch hook to save data in redux store

  const nowPlayingMovies = useSelector((store)=>{
    return store.movies.nowPlayingMovies;
  }) // FOR MEMOIZATION , IF DATA NOT IN REDUX STORE THAN ONLY MAKE API CALL

  //Async function to make api call
  const getNowPlayingMovies = async()=>{
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1', 
      TMDB_API_OPTIONS
    );

    const json = await data.json();
    console.log(json.results) ;
    
    dispatch(addNowPlayingMovies(json.results)); // add movie data to movie Slice
  };

  // make api call once whenever page loads 
  useEffect(()=>{
    !nowPlayingMovies && getNowPlayingMovies(); // only make api call when no movie, once we have dont make api call
  },[]);
};

export default useNowPlayingMovies;

// hooks always start with use and then capital(camel case)