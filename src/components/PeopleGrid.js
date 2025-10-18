import { FALLBACK_IMG } from "../utils/constants";

const PeopleGrid = ({ cast = [], crew = [] }) => {
  //  Filter key crew roles to display alongside cast
  const keyCrew = crew.filter(c =>
    ['Director', 'Writer', 'Screenplay', 'Producer'].includes(c.job)
  );

  //  Merge cast and crew into a single array
  const people = [...cast, ...keyCrew];

  return (
    <div className="mt-8">
      {/* 🔹 Section Heading */}
      <h2 className="text-lg font-semibold text-white mb-2">Cast & Crew</h2>
      <hr className="border-gray-700 mb-6" />

      {/* 🔹 Responsive Grid Layout: 2 cols on mobile, 3 on tablet, 5 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {people.map(person => (
          <div
            key={`${person.id}-${person.credit_id}`}
            className="bg-white/5 rounded-md p-2 shadow-sm hover:scale-105 transition-transform"
          >
            {/* 🔹 Profile Image with fallback and cropping fix */}
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : FALLBACK_IMG
              }
              alt={person.name}
              className="w-full aspect-[2/3] object-cover object-top rounded mb-2"
            />

            {/* 🔹 Name */}
            <h3 className="text-sm font-semibold text-white line-clamp-1">
              {person.name}
            </h3>

            {/* 🔹 Role: character for cast, job for crew */}
            <p className="text-xs text-gray-400 line-clamp-2">
              {person.character || person.job}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleGrid;