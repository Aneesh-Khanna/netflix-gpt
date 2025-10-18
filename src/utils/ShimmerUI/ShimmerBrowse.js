import ShimmerHeader from "./ShimmerHeader";
import ShimmerVideo from "./ShimmerVideo";
import ShimmerRow from "./ShimmerRow";

const ShimmerBrowse = () => (
  <div className="bg-black min-h-screen text-white">
    <ShimmerHeader />
    <ShimmerVideo />
    <div className="pl-4 md:pl-12 bg-gradient-to-b from-black via-black/90 to-black space-y-8 relative z-30 md:-mt-24 pt-8">
      {["Now Playing", "Popular Movies", "Top Rated Movies", "Upcoming Movies"].map((title) => (
        <ShimmerRow key={title} title={title} />
      ))}
    </div>
  </div>
);

export default ShimmerBrowse;