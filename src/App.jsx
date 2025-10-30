import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=3a124893";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [darkMode, setDarkMode] = useState(false);

  const fetchMovies = async () => {
    const response = await fetch(`${API_URL}&s=${searchTerm}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={fetchMovies}
        darkMode={darkMode}
      />
      <main className="flex-1 w-full flex justify-center">
        <MovieList movies={movies} darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
