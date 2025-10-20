import { Search } from "lucide-react";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-700/30">
          <Search className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-purple-400 mb-2">
        No Movies Found
      </h2>

      {/* Message */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        We couldn’t find any movies matching your search. <br />
        Try a different genre, title, or keyword.
      </p>

      {/* Decorative tag */}
      <div className="bg-gray-800 text-gray-300 rounded-lg py-1 px-3 text-xs">
        Search returned no results
      </div>
    </div>
  );
};

export default NoResults;