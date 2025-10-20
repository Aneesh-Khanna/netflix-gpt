import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NoResults from './NoResults';

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames || movieResults.length === 0) return null;

  const hasResults = movieResults?.[0]?.length > 0; // to condition render no result or moviesuggestionList
  return (
    <div className="mt-6">
      {/* Scrollable Relevant Results Row*/}
      {hasResults ? (
        <MovieList
          title="Relevant Results"
          movies={movieResults[0]}
          origin="gpt"
        />
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default GptMovieSuggestions;

{/*
  it works as first time i see the page i see nothing(no movie list nor error component) but when i 
  search for results and get none then error is shown
  if (!movieNames || movieResults.length === 0) return null;


This acts as a gatekeeper: it prevents the component from rendering until a search has been made. So:
- ✅ On first load: movieNames is empty → component returns null → no UI shown
- ✅ After a search: movieNames is populated → component renders
- If movieResults[0].length > 0 → shows <MovieList />
- If movieResults[0].length === 0 → shows <NoResults />

You're using movieNames as a signal that a search has been performed. That way, <NoResults /> only shows after a search — not on first load

*/
  }