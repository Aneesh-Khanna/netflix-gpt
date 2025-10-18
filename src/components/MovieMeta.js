import { Star } from 'lucide-react'; // Icon component for getting star icon

const MovieMeta = ({ details }) => {
  // 🔹 Render star icons based on vote_average (scaled to 5 stars)
  const renderStars = () => {
    const stars = Math.round(details.vote_average / 2); // TMDB ratings are out of 10
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < stars ? 'text-yellow-400' : 'text-gray-600'} // Highlight filled stars
      />
    ));
  };

  return (
    <div className="text-sm text-gray-400 mb-8 space-y-1">
      {/* 🔹 Release Date */}
      <p>
        <span className="text-white font-medium">Release Date:</span>{' '}
        {details.release_date}
      </p>

      {/* 🔹 Runtime */}
      <p>
        <span className="text-white font-medium">Runtime:</span>{' '}
        {details.runtime} min
      </p>

      {/* 🔹 Genres */}
      <p>
        <span className="text-white font-medium">Genres:</span>{' '}
        {details.genres?.map(g => g.name).join(', ')}
      </p>

      {/* 🔹 Rating with stars */}
      <p className="flex items-center gap-2">
        <span className="text-white font-medium">Rating:</span>
        {renderStars()}
        <span>{details.vote_average.toFixed(1)} / 10</span>
      </p>

      {/* 🔹 Spoken Languages (if available) */}
      {details.spoken_languages?.length > 0 && (
        <p>
          <span className="text-white font-medium">Languages:</span>{' '}
          {details.spoken_languages.map(l => l.english_name).join(', ')}
        </p>
      )}

      {/* 🔹 Production Companies (if available) */}
      {details.production_companies?.length > 0 && (
        <p>
          <span className="text-white font-medium">Production:</span>{' '}
          {details.production_companies.map(p => p.name).join(', ')}
        </p>
      )}
    </div>
  );
};

export default MovieMeta;