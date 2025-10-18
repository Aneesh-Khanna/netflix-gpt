import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name : "movies" ,

    initialState : {
        nowPlayingMovies : null ,
        nowPopularMovies : null ,
        nowTopRatedMovies : null ,
        nowUpcomingMovies : null ,
    },

    reducers : {
        addNowPlayingMovies : (state,action)=>{
            state.nowPlayingMovies = (action.payload);
        },
        addPopularMovies :(state,action)=>{
            state.nowPopularMovies = (action.payload) ; 
        },
        addTopRatedMovies : (state,action)=>{
            state.nowTopRatedMovies = (action.payload);
        },
        addUpcomingMovies : (state,action) =>{
            state.nowUpcomingMovies = (action.payload);
        }
    },
});

export const { addNowPlayingMovies ,addPopularMovies ,addTopRatedMovies , addUpcomingMovies} = movieSlice.actions;

export default movieSlice.reducer;

// reducers are basically functions .
// slice is basically containing objects in key value pair 