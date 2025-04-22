import React from 'react';
import styles from '../styles/MovieCard.module.css';

function MovieCard({ movie, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{new Date(movie.release_date).getFullYear()}</p>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
}