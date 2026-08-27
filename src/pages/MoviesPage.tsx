import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchForm from "../components/movies/SearchForm";
import MovieGrid from "../components/movies/MovieGrid";
import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdbApi";
import type { Movie } from "../types/movie";
import { genres } from "../constants/genres";

function MoviesPage() {
  // Login success message
  const location = useLocation();
  const message = location.state?.message;

  // Movie data and UI state
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected genre for filtering
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    let ignoreResult = false;

    // Load popular movies when the page opens
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

  // Filter movies by selected genre
  const filteredMovies = selectedGenre
    ? movies.filter((movie) =>
        movie.genre_ids?.includes(Number(selectedGenre))
      )
    : movies;

  return (
    <>
      {message && (
        <div
          className="alert alert-success text-center"
          role="alert"
        >
          ✅ {message}
        </div>
      )}

      <SearchForm
        onSearch={handleSearch}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {loading && (
        <p className="text-center">
          Loading movies...
        </p>
      )}

      {error && (
        <p className="text-center text-danger">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        filteredMovies.length === 0 && (
          <p className="text-center">
            No movies were found.
          </p>
        )}

      {!loading &&
        !error &&
        filteredMovies.length > 0 && (
          <MovieGrid movies={filteredMovies} />
        )}
    </>
  );
}

export default MoviesPage;