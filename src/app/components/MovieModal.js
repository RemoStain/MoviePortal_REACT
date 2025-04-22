import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './MovieModal.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data));

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setCast(data.cast.slice(0, 5)));
  }, [movieId]);

  if (!movie) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
        <p>{movie.overview}</p>
        <p>⭐ {movie.vote_average}</p>
        <h3>Cast</h3>
        <ul>
          {cast.map(actor => <li key={actor.cast_id}>{actor.name} as {actor.character}</li>)}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default MovieModal;