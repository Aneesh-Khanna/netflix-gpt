import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../utils/constants"
import { addTopRatedMovies } from "../utils/ReduxStore/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = ()=>{

  const dispatch = useDispatch(); 

  const TopRatedMovies = useSelector((store)=>{
    return store.movies.TopRatedMovies;
  })

  const getTopRatedMovies = async()=>{
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1', 
      TMDB_API_OPTIONS
    );

    const json = await data.json();
    dispatch(addTopRatedMovies(json.results)); 
  };

  useEffect(()=>{
    !TopRatedMovies && getTopRatedMovies(); 
  },[]);
};

export default useTopRatedMovies;