import { useSelector } from "react-redux";

const ShimmerMovieRow = () => {
  const theme = useSelector((store) => store.config.theme);

  // Theme-aware shimmer base
  const shimmerBase = theme === "dark" ? "bg-white/10" : "bg-black/10";
  const fadeLeft = theme === "dark" ? "from-black" : "from-white";
  const fadeRight = theme === "dark" ? "from-black" : "from-white";

  return (
    <div className="pt-16 px-6 animate-pulse overflow-hidden max-h-[calc(100vh-100px)]">
      {/* Title shimmer block */}
      <div className={`h-6 w-48 ${shimmerBase} rounded mb-6 ml-2`} />

      {/* Scrollable shimmer row */}
      <div className="relative">
        {/* Left fade mask */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r ${fadeLeft} to-transparent z-10 pointer-events-none`} />
        {/* Right fade mask */}
        <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l ${fadeRight} to-transparent z-10 pointer-events-none`} />

        {/* Shimmer cards */}
        <div className="flex overflow-x-auto gap-6 px-6 py-2 scrollbar-hide snap-x snap-mandatory relative z-0">
          {Array(5).fill("").map((_, i) => (
            <div
              key={i}
              className={`w-[180px] h-[210px] ${shimmerBase} rounded-md flex-shrink-0`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerMovieRow;