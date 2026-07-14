import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  return (
    <article className={styles.card}>
      <p className={styles.meta}>
        {movie.director} · {movie.year}
      </p>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.genre}>{movie.genre}</p>
      <Link className={styles.link} to={`/movies/${movie.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}

export default MovieCard;
