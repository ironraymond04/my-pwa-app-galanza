function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="my-4 flex justify-center items-center">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md"
      />
      <button
        onClick={onSearch}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
