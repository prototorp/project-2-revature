import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
} from "../services/tmdbApi";

import type { Movie } from "../types/movie";

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  search: (query: string) => void;
  filterByGenre: (
    genreId: number | null,
  ) => void;
}

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>(
    [],
  );

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const [page, setCurrentPage] =
    useState<number>(1);

  const [totalPages, setTotalPages] =
    useState<number>(1);

  const [query, setQuery] = useState<string>("");

  const [genreId, setGenreId] = useState<
    number | null
  >(null);

  const [requestVersion, setRequestVersion] =
    useState(0);

  useEffect(() => {
    let ignoreResult = false;

    async function fetchMovies() {
      try {
        let data;

        if (query !== "") {
          data = await searchMovies(query, page);
        } else if (genreId !== null) {
          data = await getMoviesByGenre(
            genreId,
            page,
          );
        } else {
          data = await getPopularMovies(page);
        }

        if (!ignoreResult) {
          setMovies(data.results);

          setTotalPages(
            Math.max(data.total_pages, 1),
          );
        }
      } catch (requestError) {
        if (!ignoreResult) {
          setMovies([]);

          setError(
            requestError instanceof Error
              ? requestError.message
              : "Failed to load movies",
          );
        }
      } finally {
        if (!ignoreResult) {
          setLoading(false);
        }
      }
    }

    void fetchMovies();

    return () => {
      ignoreResult = true;
    };
  }, [
    page,
    query,
    genreId,
    requestVersion,
  ]);

  const setPage = useCallback(
    (newPage: number) => {
      setLoading(true);
      setError(null);
      setCurrentPage(Math.max(newPage, 1));

      setRequestVersion(
        (version) => version + 1,
      );
    },
    [],
  );

  const search = useCallback(
    (newQuery: string) => {
      setLoading(true);
      setError(null);
      setQuery(newQuery);
      setGenreId(null);
      setCurrentPage(1);

      setRequestVersion(
        (version) => version + 1,
      );
    },
    [],
  );

  const filterByGenre = useCallback(
    (newGenreId: number | null) => {
      setLoading(true);
      setError(null);
      setGenreId(newGenreId);
      setQuery("");
      setCurrentPage(1);

      setRequestVersion(
        (version) => version + 1,
      );
    },
    [],
  );

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    setPage,
    search,
    filterByGenre,
  };
}