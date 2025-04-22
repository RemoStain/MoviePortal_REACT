import React from 'react';

function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 mb-4 w-full"
    />
  );
}

export default SearchBar;