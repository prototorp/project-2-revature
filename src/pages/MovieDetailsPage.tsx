import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdbApi";
import type { MovieDetails } from "../types/movie";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignoreResult = false;

    async function loadMovieDetails() {
      const numericMovieId = Number(movieId);

      if (!movieId || Number.isNaN(numericMovieId)) {
        setError("Invalid movie ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const result = await getMovieDetails(numericMovieId);

        if (!ignoreResult) {
          setMovie(result);
        }
      } catch (requestError) {
        console.error(requestError);

        if (!ignoreResult) {
          setError("Failed to load movie details.");
        }
      } finally {
        if (!ignoreResult) {
          setLoading(false);
        }
      }
    }

    void loadMovieDetails();

    return () => {
      ignoreResult = true;
    };
  }, [movieId]);

  if (loading) {
    return <p className="text-center mt-4">Loading movie details...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-4">{error}</p>;
  }

  if (!movie) {
    return <p className="text-center mt-4">Movie not found.</p>;
  }

  return (
    <section className="container my-4">
      <Link className="btn btn-secondary mb-3" to="/movies">
        Back to movies
      </Link>

      <div className="card">
        <div className="row g-0">
          {movie.poster_path && (
            <div className="col-md-4">
              <img
                className="img-fluid rounded-start"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            </div>
          )}

          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{movie.title}</h1>

              {movie.tagline && (
                <p className="fst-italic">{movie.tagline}</p>
              )}

              <p>{movie.overview}</p>
              <p>Rating: ⭐ {movie.vote_average.toFixed(1)}</p>
              <p>Release date: {movie.release_date}</p>

              {movie.runtime !== null && (
                <p>Runtime: {movie.runtime} minutes</p>
              )}

              <div>
                {movie.genres.map((genre) => (
                  <span
                    className="badge bg-secondary me-2"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetailsPage;