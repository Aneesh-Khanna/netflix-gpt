import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
    state.showGptSearch = typeof action.payload === "boolean"
    ? action.payload
    : !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearGptResults: (state) => {
      state.movieNames = [];
      state.movieResults = [];
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult , clearGptResults} = gptSlice.actions;

export default gptSlice.reducer;