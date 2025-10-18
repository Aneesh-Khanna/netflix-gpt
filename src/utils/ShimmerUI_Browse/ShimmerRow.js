const ShimmerRow = ({ title }) => (
  <div className="px-6">
    <div className="h-6 md:h-8 w-48 bg-gray-700 rounded animate-pulse mb-4" />
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="flex overflow-x-auto gap-6 px-4 py-2 scrollbar-hide snap-x snap-mandatory relative z-0">
        {Array(5).fill("").map((_, index) => (
          <div
            key={index}
            className="w-32 md:w-40 lg:w-52 aspect-[2/3] bg-gray-800 rounded-md animate-pulse flex-shrink-0 snap-start"
          />
        ))}
      </div>
    </div>
  </div>
);

export default ShimmerRow;