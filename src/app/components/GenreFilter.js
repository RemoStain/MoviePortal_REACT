import React from 'react';

function GenreFilter({ genres, setGenre }) {
  return (
    <select onChange={(e) => setGenre(e.target.value)} className="border p-2 mb-4 w-full">
      <option value="">All Genres</option>
      {genres.map(genre => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      ))}
    </select>
  );
}

export default GenreFilter;