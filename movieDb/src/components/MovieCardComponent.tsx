import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onSelect: (id: number) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  return (
    <div className="movie-card card h-100" onClick={() => onSelect(movie.id)}>
      {movie.poster_path && (
        <img
          className="movie-poster card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>

        <p className="card-text">⭐{movie.overview}</p>
        <p className="movie-rating">
            ⭐⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="movie-date">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
