import axios from "axios";
import type { Movie, TMDBResponse, MovieDetails } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export async function getPopularMovies(page: number = 1): Promise<TMDBResponse> {
  
  const response = await api.get<TMDBResponse>("/movie/popular", { params: { page } });

  return response.data;
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
    
    const response = await api.get<TMDBResponse>("/search/movie", { params: { query, page } });

    return response.data;
}

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse> {

  const response = await api.get<TMDBResponse>("/discover/movie", { params: { with_genres: genreId, page } });
  
  return response.data;
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  // Line above changed
  const response = await api.get<MovieDetails>(`/movie/${id}`);
  
  return response.data;
}

export interface GenreResponse {
    genres: { id: number; name: string }[];
}

export async function getGenres(): Promise<{ id: number; name: string }[]> {
    const response = await api.get<GenreResponse>("/genre/movie/list");

    return response.data.genres;
}