import { useMovies } from "../hooks/useMovies";
import MovieGrid from "../components/movies/MovieGrid";
import SearchForm from "../components/movies/SearchForm";
import MovieFilters from "../components/movies/MovieFilters";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

function MoviesPage() {
  const {
    movies,
    loading,
    error,
    page,
    totalPages,
    setPage,
    search,
    filterByGenre,
  } = useMovies();

  return (
    <div>
      <h1>Movies</h1>

      <SearchForm onSearch={search} />

      <MovieFilters onFilterChange={filterByGenre} />

      {(() => {
        if (loading) return <LoadingSpinner />;
        else if (error) return <ErrorMessage message={error} />;
        else if (movies.length === 0) return <p>No movies were found.</p>;
        return <MovieGrid movies={movies} />;
      })()}

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MoviesPage;