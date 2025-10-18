import React from 'react'
import Header from './Header'
import MainContainerBrowse from './MainContainerBrowse';
import SecondaryContainerBrowse from './SecondaryContainerBrowse';
import useNowPlayingMovies from '../customHooks/useNowPlayingMovies'


const Browse = () => {

  //call the custom hook to make api call and save to redux store
  useNowPlayingMovies();


  return (
    <div>
        <Header/>
        <MainContainerBrowse/>
        <SecondaryContainerBrowse/>
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
