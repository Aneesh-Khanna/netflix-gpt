const ShimmerHeader = () => (
  <div className="absolute top-0 left-0 w-screen z-20 bg-gradient-to-b from-gray-900 via-black/95 to-transparent">
    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">
      <div className="w-32 sm:w-36 md:w-44 h-10 bg-gray-800 rounded animate-pulse" />
      <div className="flex gap-4 mt-4 md:mt-0">
        <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse hidden md:block" />
        <div className="w-24 h-8 bg-red-700 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default ShimmerHeader;