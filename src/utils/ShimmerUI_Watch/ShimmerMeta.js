const ShimmerMeta = () => (
  <div className="space-y-2 mb-8 animate-pulse">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-700 rounded w-2/3" />
    ))}
  </div>
);
export default ShimmerMeta;