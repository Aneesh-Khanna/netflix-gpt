import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';

const SecondaryContainerBrowse = () => {

  const movies = useSelector((store)=>{
    return store.movies;
  })  // to get movies data

  return ( 
    <div className="pl-4 md:pl-12  bg-gradient-to-b from-black via-black/black to-black">
      {/* black background for secondary container */}
      {/* contains many movie lists */}
      {/* overlap the first movie list with video */}
      <div className="relative z-30 md:-mt-24">
      <MovieList title={"Now Playing"} movies ={movies?.nowPlayingMovies}/>
      </div>
      <div className=" relative z-20">
      <MovieList title={"Popular Movies"} movies = {movies?.nowPopularMovies}/>
      <MovieList title={"Top Rated Movies"} movies = {movies?.nowTopRatedMovies}/>
      <MovieList title={"Upcoming Movies"} movies = {movies?.nowUpcomingMovies}/>
      </div>
   </div>
  ) 
}

export default SecondaryContainerBrowse

{/* it contains many movie list 
    MovieList - NowPlaying
      - MovieCard * n
    MoveList - Popular
    like this

    and in each movie list we have multiple cards
  */
}

{/* moved to black color outwards so that secondary container remains black but the items in it are pushed upwards
  so that in main container, items come with transparent background */}