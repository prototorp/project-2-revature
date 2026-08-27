import type {
  Genre,
  MovieDetails,
  TMDBResponse,
} from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function requestTMDB<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Add VITE_TMDB_API_KEY to .env.local.",
    );
  }

  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `TMDB request failed with status ${response.status}.`,
    );
  }

  return response.json() as Promise<T>;
}

export async function getPopularMovies(
  page: number = 1,
): Promise<TMDBResponse> {
  return requestTMDB<TMDBResponse>("/movie/popular", {
    page,
  });
}

export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<TMDBResponse> {
  return requestTMDB<TMDBResponse>("/search/movie", {
    query,
    page,
  });
}

export async function getMoviesByGenre(
  genreId: number,
  page: number = 1,
): Promise<TMDBResponse> {
  return requestTMDB<TMDBResponse>("/discover/movie", {
    with_genres: genreId,
    page,
  });
}

export async function getMovieDetails(
  id: number,
): Promise<MovieDetails> {
  return requestTMDB<MovieDetails>(
    `/movie/${id}`,
    {
      append_to_response: "release_dates",
    },
  );
}

interface GenreResponse {
  genres: Genre[];
}

export async function getGenres(): Promise<Genre[]> {
  const response = await requestTMDB<GenreResponse>(
    "/genre/movie/list",
  );

  return response.genres;
}