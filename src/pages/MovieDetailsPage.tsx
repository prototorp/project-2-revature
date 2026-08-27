import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getMovieDetails } from "../services/tmdbApi";
import type { MovieDetails } from "../types/movie";

function MovieDetailsPage() {
  const { movieId } = useParams();

  const [detailsState, setDetailsState] =
    useState<{
      requestedId: string | undefined;
      movie: MovieDetails | null;
      error: string;
    }>({
      requestedId: movieId,
      movie: null,
      error: "",
    });

  const numericMovieId = Number(movieId);

  const invalidMovieId =
    !movieId ||
    !Number.isInteger(numericMovieId) ||
    numericMovieId <= 0;

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const requestedMovieId = Number(movieId);

    if (
      !Number.isInteger(requestedMovieId) ||
      requestedMovieId <= 0
    ) {
      return;
    }

    let ignoreResult = false;

    getMovieDetails(requestedMovieId)
      .then((result) => {
        if (!ignoreResult) {
          setDetailsState({
            requestedId: movieId,
            movie: result,
            error: "",
          });
        }
      })
      .catch((requestError: unknown) => {
        console.error(requestError);

        if (!ignoreResult) {
          setDetailsState({
            requestedId: movieId,
            movie: null,
            error:
              "Failed to load movie details.",
          });
        }
      });

    return () => {
      ignoreResult = true;
    };
  }, [movieId]);

  if (invalidMovieId) {
    return (
      <p className="text-center text-danger mt-4">
        Invalid movie ID.
      </p>
    );
  }

  if (detailsState.requestedId !== movieId) {
    return (
      <p className="text-center mt-4">
        Loading movie details...
      </p>
    );
  }

  if (detailsState.error) {
    return (
      <p className="text-center text-danger mt-4">
        {detailsState.error}
      </p>
    );
  }

  if (!detailsState.movie) {
    return (
      <p className="text-center mt-4">
        Loading movie details...
      </p>
    );
  }

  const movie = detailsState.movie;

  return (
    <section className="container my-4">
      <Link
        className="btn btn-secondary mb-3"
        to="/movies"
      >
        Back to movies
      </Link>

      <div className="card">
        <div className="row g-0">
          {movie.poster_path && (
            <div className="col-md-4">
              <img
                className="img-fluid rounded-start"
                src={
                  `https://image.tmdb.org/t/p/w500` +
                  movie.poster_path
                }
                alt={`${movie.title} poster`}
              />
            </div>
          )}

          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="fst-italic">
                  {movie.tagline}
                </p>
              )}

              <p>{movie.overview}</p>

              <p>
                Rating: ⭐{" "}
                {movie.vote_average.toFixed(1)}
              </p>

              <p>
                Release date:{" "}
                {movie.release_date}
              </p>

              {movie.runtime !== null && (
                <p>
                  Runtime: {movie.runtime} minutes
                </p>
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