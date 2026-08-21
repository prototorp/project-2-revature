import type { MovieDetails as MovieDetailsType } from "../types/movie";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className="movie-details container mt-4">
      
      <div className="card">
        <div className="card-body">
          <h2>{movie.title}</h2>

          <p>{movie.overview}</p>

          <p>⭐ {movie.vote_average}</p>

          <p>{movie.release_date}</p>

          <div>
            {movie.genres.map((genre) => (
              <span key={genre.id} className="badge bg-secondary me-2">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
