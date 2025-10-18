const ShimmerVideo = () => (
  <div className="relative w-screen h-screen overflow-hidden">
    <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse -z-10" />
    <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-24 text-white bg-gradient-to-r from-black via-black/60 to-transparent z-10">
      <div className="w-2/3 md:w-1/2 h-10 bg-gray-700 rounded animate-pulse mb-3" />
      <div className="hidden md:block w-1/2 h-6 bg-gray-700 rounded animate-pulse mb-5" />
      <div className="flex gap-3 mt-4">
        <div className="w-24 h-10 bg-gray-700 rounded animate-pulse" />
        <div className="w-24 h-10 bg-gray-700 rounded animate-pulse hidden md:block" />
      </div>
    </div>
  </div>
);

export default ShimmerVideo;