function Header({ darkMode, setDarkMode }) {
  return (
    <header className="bg-gradient-to-r from-red-500 via-green-500 to-blue-500 w-full py-6 px-4 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-4">
        <div></div>

        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-2xl">🍿 Popcorn Center</h1>
          <p className="text-lg">Your worldwide movie directory.</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-1 rounded-md border transition-colors duration-300 bg-white text-gray-800 hover:bg-gray-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
