const ShimmerCast = () => (
  <div className="mt-8 animate-pulse">
    <div className="h-5 w-1/4 bg-gray-700 rounded mb-2" /> {/* Cast & Crew heading */}
    <div className="h-[1px] w-full bg-gray-700 mb-6" />     {/* Divider */}

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-md p-2">
          <div className="w-full aspect-[2/3] bg-gray-700 rounded mb-2" />
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-1" />
          <div className="h-3 bg-gray-600 rounded w-2/3" />
        </div>
      ))}
    </div>
  </div>
);
export default ShimmerCast;