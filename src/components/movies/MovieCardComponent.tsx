import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Unknown";

  return (
    <article className="movie-card card h-100">
      {movie.poster_path ? (
        <img
          className="movie-poster card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
      ) : (
        <div className="p-5 text-center">No poster available</div>
      )}

      <div className="card-body d-flex flex-column">
        <h2 className="card-title h5">{movie.title}</h2>

        <p>⭐ {movie.vote_average.toFixed(1)}</p>
        <p>{releaseYear}</p>

        <Link
          className="btn btn-primary mt-auto"
          to={`/movies/${movie.id}`}
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default MovieCard;