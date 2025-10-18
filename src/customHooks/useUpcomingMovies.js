import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../utils/constants"
import { addUpcomingMovies } from "../utils/ReduxStore/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = ()=>{

  const dispatch = useDispatch(); 

  const UpcomingMovies = useSelector((store)=>{
    return store.movies.UpcomingMovies;
  })

  const getUpcomingMovies = async()=>{
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?page=1', 
      TMDB_API_OPTIONS
    );

    const json = await data.json();
    dispatch(addUpcomingMovies(json.results)); 
  };

  useEffect(()=>{
    !UpcomingMovies && getUpcomingMovies(); 
  },[]);
};

export default useUpcomingMovies;