import { useState, useEffect, useCallback } from "react";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
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
  filterByGenre: (genreId: number | null) => void;
}

export function useMovies(): UseMoviesResult {

  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(1);

  const [query, setQuery] = useState<string>("");

  const [genreId, setGenreId] = useState<number | null>(null);

  
  useEffect(() => {
    async function fetchMovies() {
        setLoading(true);
        setError(null);

        try {
            let data;
            if (query !== "") {
                data = await searchMovies(query, page);
            } else if (genreId) {
                data = await getMoviesByGenre(genreId, page);
            } else {
                data = await getPopularMovies(page);
            }

            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load movies");
        } finally {
            setLoading(false);
        }
    }
    fetchMovies();
  }, [page, query, genreId]);

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, []);

  const filterByGenre = useCallback((newGenreId: number | null) => {
    setGenreId(newGenreId);
    setPage(1);
  }, []);

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