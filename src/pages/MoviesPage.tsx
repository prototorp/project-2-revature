import { useEffect, useState } from "react";
import SearchForm from "../components/movies/SearchForm";
import MovieGrid from "../components/movies/MovieGrid";
import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdbApi";
import type { Movie } from "../types/movie";

function MoviesPage() {
  // The initial request begins when the page opens,
  // so loading starts as true.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignoreResult = false;

    // There are no synchronous state updates here.
    getPopularMovies()
      .then((results) => {
        if (!ignoreResult) {
          setMovies(results);
        }
      })
      .catch((requestError) => {
        console.error(requestError);

        if (!ignoreResult) {
          setError("Failed to load popular movies.");
        }
      })
      .finally(() => {
        if (!ignoreResult) {
          setLoading(false);
        }
      });

    return () => {
      ignoreResult = true;
    };
  }, []);

  async function handleSearch(searchTerm: string) {
    // This function runs because of a user event,
    // so synchronous state updates are appropriate here.
    setLoading(true);
    setError("");

    try {
      const results = searchTerm
        ? await searchMovies(searchTerm)
        : await getPopularMovies();

      setMovies(results);
    } catch (requestError) {
      console.error(requestError);
      setMovies([]);
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SearchForm onSearch={handleSearch} />

      {loading && (
        <p className="text-center">Loading movies...</p>
      )}

      {error && (
        <p className="text-center text-danger">{error}</p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center">No movies were found.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}
    </>
  );
}

export default MoviesPage;