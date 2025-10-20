const MovieHeading = ({ title, tagline }) => (
  <div className="mt-10 mb-4 sm:mt-6 md:mt-6">
    {/*Movie Heading*/}
    <h1 className="text-xl md:text-3xl font-bold mb-1">{title}</h1>

    {/*Movie Tagline*/}
    {tagline && <p className="text-sm italic text-gray-400">{tagline}</p>}
  </div>
);

export default MovieHeading;
