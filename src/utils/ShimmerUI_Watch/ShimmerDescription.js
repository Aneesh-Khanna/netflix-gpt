const ShimmerDescription = () => (
  <div className="mb-6 animate-pulse">
    <div className="h-5 w-1/4 bg-gray-700 rounded mb-2" /> {/* Description heading */}
    <div className="h-[1px] w-full bg-gray-700 mb-4" />     {/* Divider */}
    <div className="space-y-2 w-full md:w-[95%]">
      <div className="h-4 bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-700 rounded w-5/6" />
      <div className="h-4 bg-gray-700 rounded w-4/6" />
    </div>
  </div>
);
export default ShimmerDescription;