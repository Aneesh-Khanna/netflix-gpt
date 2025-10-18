const MovieDescription = ({ overview }) => (
  <div className="mb-6">
    {/* Heading */}
    <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
    <hr className="border-gray-700 mb-4" />

    {/* Description Text */}
    <p className="text-gray-300 text-sm md:text-base leading-relaxed w-full md:w-[95%]">
      {overview || "No description available."}
    </p>
  </div>
);

export default MovieDescription;