import { useState, useEffect, useRef } from "react";

function MovieCard({ movie, darkMode }) {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const modalRef = useRef(null);
  const API_KEY = "3a124893";

  useEffect(() => {
    if (showModal && movie.imdbID) {
      fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}&plot=full`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "True") {
            setDetails(data);
          } else {
            setDetails(null);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [showModal, movie.imdbID]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    if (showModal) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const handleWatchTrailer = async (title, year) => {
    const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    try {
      const query = encodeURIComponent(`${title} ${year} official trailer`);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
      } else alert("No trailer found.");
    } catch (err) {
      console.error(err);
      alert("Unable to load trailer.");
    }
  };

  return (
    <>
      <div
        className={`shadow rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg ${
          darkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800"
        }`}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-md"
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
        <h2 className="font-bold mt-3 text-lg">{movie.Title}</h2>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{movie.Year}</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          View Details
        </button>
      </div>

      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 overflow-auto transition-colors duration-300 ${
            darkMode ? "bg-black/80" : "bg-gray-800/50"
          }`}
        >
          <div
            ref={modalRef}
            className={`rounded-xl shadow-lg w-full max-w-2xl p-6 relative animate-fadeIn transition-colors duration-300 ${
              darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-3 right-3 ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              } text-2xl cursor-pointer`}
            >
              &times;
            </button>

            {details ? (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <img
                    src={details.Poster !== "N/A" ? details.Poster : "https://via.placeholder.com/200"}
                    alt={details.Title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
                  />
                  <button
                    onClick={() => handleWatchTrailer(details.Title, details.Year)}
                    className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                  >
                    🎬 Watch Trailer
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{details.Title}</h2>
                  <p className={`mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="font-semibold">Year:</span> {details.Year}
                  </p>
                  <p className={`mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="font-semibold">Genre:</span> {details.Genre || "N/A"}
                  </p>
                  <p className={`mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="font-semibold">Released:</span> {details.Released || "N/A"}
                  </p>
                  <p className={`mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="font-semibold">Cast:</span> {details.Actors || "N/A"}
                  </p>
                  <p className={`mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <span className="font-semibold">Plot:</span> {details.Plot || "No plot available."}
                  </p>
                  {details.Website && details.Website !== "N/A" && (
                    <a
                      href={details.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-500 hover:underline"
                    >
                      🌐 Official Site
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className={`text-center py-10 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Loading details...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MovieCard;
