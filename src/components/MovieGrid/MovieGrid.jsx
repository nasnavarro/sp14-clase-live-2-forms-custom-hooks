import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieGrid.module.css';

function MovieGrid({ movies }) {
  return (
    <section className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieGrid;
