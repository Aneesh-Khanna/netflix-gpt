const MovieTrailer = ({ trailerKey }) => (
  <div className="aspect-video w-full mb-6">
    {trailerKey ? (
      <iframe
        className="w-full h-full rounded-md shadow-lg"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&rel=0`}
        title="YouTube video player"
        allow="autoplay; encrypted-media; fullscreen"
      />
    ) : (
      <div className="text-gray-400 text-sm">Trailer not available.</div>
    )}
  </div>
);

export default MovieTrailer;
