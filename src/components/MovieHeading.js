const MovieHeading = ({ title, tagline }) => (
  <div className="mt-6 mb-4">
    {/*Movie Heading*/}
    <h1 className="text-xl md:text-3xl font-bold mb-1">{title}</h1>

    {/*Movie Tagline*/}
    {tagline && <p className="text-sm italic text-gray-400">{tagline}</p>}
  </div>
);

export default MovieHeading;
