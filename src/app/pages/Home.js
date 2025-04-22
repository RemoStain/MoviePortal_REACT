import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setGenres(data.genres));
  }, []);

  useEffect(() => {
    let query = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000&page=${page}`;
    if (search) {
      query = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&page=${page}`;
    }
    if (genre) query += `&with_genres=${genre}`;

    fetch(query)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [search, genre, page]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Portal</h1>
      <SearchBar setSearch={setSearch} />
      <GenreFilter genres={genres} setGenre={setGenre} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie.id)} />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Previous</button>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
      {selectedMovie && <MovieModal movieId={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}

export default Home;