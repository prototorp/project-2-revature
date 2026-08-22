import type {
  Movie,
  MovieDetails,
  TMDBResponse,
} from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

async function requestTMDB<T>(endpoint: string): Promise<T> {
  if (!token) {
    throw new Error("The TMDB access token is missing.");
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await requestTMDB<TMDBResponse>("movie/popular");
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const encodedQuery = encodeURIComponent(query);

  const data = await requestTMDB<TMDBResponse>(
    `search/movie?query=${encodedQuery}`,
  );

  return data.results;
}

export function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return requestTMDB<MovieDetails>(`movie/${movieId}`);
}