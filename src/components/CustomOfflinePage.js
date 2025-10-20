const CustomOfflinePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Phone-like container */}
      <div className="w-[340px] max-w-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 text-center border border-white/20">
        
        {/* Icon */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636a9 9 0 11-12.728 0M12 9v3m0 3h.01"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 tracking-wide">You're Offline</h1>

        {/* Message */}
        <p className="text-sm text-gray-300 mb-1">
          It looks like your internet connection is lost.
        </p>
        <p className="text-sm text-gray-400">
          Please check your network and try again.
        </p>
      </div>
    </div>
  );
};

export default CustomOfflinePage;