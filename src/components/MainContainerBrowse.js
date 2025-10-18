import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainerBrowse = () => {
  //Subscribing to movie slice to get movie data

  const movies = useSelector((store)=>{
    return store.movies?.nowPlayingMovies;
  });
// this gives data of 20 or so movies, but we need only 1 movie data for main container
  if(!movies) return; // to prevent a error because redux store isnt loaded yet and useNowPlayingMovie data is null
  // early return

  const mainMovie = movies[0];

  const { original_title , overview , id} = mainMovie;  // getting info from mainmovie object


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <VideoBackground movieId = {id}/>
      <VideoTitle title={original_title} overview={overview} /> {/*passing props*/}
    </div>
  )
}

export default MainContainerBrowse


{ /*  useSelector subscribes this component to the Redux store.

The selector receives the entire store and returns store.movies?.nowPlayingMovies.

The ?. (optional chaining) prevents a crash if store.movies isn’t there yet; you’ll get undefined instead of an error.

useSelector re-renders the component whenever the returned value changes by strict ===.
On first render it might be null/undefined.
After your fetch dispatches addNowPlayingMovies, it becomes an array → component re-renders.
  */
}


{/* structure main component consists of videobackground + video title */}