import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../utils/constants"
import { addPopularMovies } from "../utils/ReduxStore/movieSlice";
import { useEffect } from "react";

const usePopularMovies = ()=>{

  const dispatch = useDispatch(); 

  const PopularMovies = useSelector((store)=>{
    return store.movies.PopularMovies;
  })

  const getPopularMovies = async()=>{
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1', 
      TMDB_API_OPTIONS
    );

    const json = await data.json();
    dispatch(addPopularMovies(json.results)); 
  };

  useEffect(()=>{
    !PopularMovies && getPopularMovies(); 
  },[]);
};

export default usePopularMovies;


// same code as that of useNowPlayingMovies hook
