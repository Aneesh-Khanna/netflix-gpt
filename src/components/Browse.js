import React from 'react'
import Header from './Header'
import MainContainerBrowse from './MainContainerBrowse';
import SecondaryContainerBrowse from './SecondaryContainerBrowse';
import useNowPlayingMovies from '../customHooks/useNowPlayingMovies'
import usePopularMovies from '../customHooks/usePopularMovies';
import useTopRatedMovies from '../customHooks/useTopRatedMovies';
import useUpcomingMovies from '../customHooks/useUpcomingMovies';
import ShimmerBrowse from '../utils/ShimmerUI_Browse/ShimmerBrowse';
import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  //call the custom hook to make api call and save to redux store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  // Access movie data from Redux to check loading state
  const movies = useSelector((store) => store.movies);

  // Show shimmer UI while any movie section is still loading
  const isLoading =
    !movies?.nowPlayingMovies ||
    !movies?.nowPopularMovies ||
    !movies?.nowTopRatedMovies ||
    !movies?.nowUpcomingMovies;

  if (isLoading) {
    return <ShimmerBrowse />;
  }
  
  return (
    <div>
        <Header/>

        {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainerBrowse />
          <SecondaryContainerBrowse />
        </>
      )}
    </div>
  )
}

export default Browse

{/* browse component can be thought as 
  Header
  Main Container
    -- VideoBackground
    -- VideoTitle
  
  Secondary Container
    -- MovieList * n
      -- cards*n
  */  
 }
{/* Browser component behaviour , it behaves as both browse page and as gpt page
    when we click on gpt button in browse page , we see gpt search component
    in gpt search we see button to go back to browse */}