export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  release_dates: ReleaseDatesResponse;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieReleaseDate {
  certification: string;
  release_date: string;
  type: number;
}

export interface CountryReleaseDates {
  iso_3166_1: string;
  release_dates: MovieReleaseDate[];
}

export interface ReleaseDatesResponse {
  results: CountryReleaseDates[];
}