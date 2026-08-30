import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import MoviesPage from "./MoviesPage";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
  getGenres,
} from "../services/tmdbApi";
import type { Movie, TMDBResponse } from "../types/movie";

vi.mock("../services/tmdbApi", () => ({
  getPopularMovies: vi.fn(),
  searchMovies: vi.fn(),
  getMoviesByGenre: vi.fn(),
  getGenres: vi.fn(),
}));

const mockedGetPopularMovies = vi.mocked(getPopularMovies);
const mockedSearchMovies = vi.mocked(searchMovies);
const mockedGetMoviesByGenre = vi.mocked(getMoviesByGenre);
const mockedGetGenres = vi.mocked(getGenres);

const actionMovie: Movie = {
  id: 1,
  title: "Action Movie",
  overview: "An action movie.",
  poster_path: "/action.jpg",
  release_date: "2025-01-01",
  vote_average: 8.2,
  genre_ids: [28],
};

const comedyMovie: Movie = {
  id: 2,
  title: "Comedy Movie",
  overview: "A comedy movie.",
  poster_path: "/comedy.jpg",
  release_date: "2024-02-01",
  vote_average: 7.4,
  genre_ids: [35],
};

const searchedMovie: Movie = {
  id: 3,
  title: "Batman",
  overview: "A Batman movie.",
  poster_path: "/batman.jpg",
  release_date: "2022-03-04",
  vote_average: 7.7,
  genre_ids: [28],
};

function movieResponse(results: Movie[]): TMDBResponse {
  return { page: 1, results, total_pages: 1, total_results: results.length };
}

function renderMoviesPage() {
  render(
    <MemoryRouter>
      <MoviesPage />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedGetGenres.mockResolvedValue([{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }]);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("MoviesPage", () => {
    it("displays a loading message while movies are being requested", () => {
        mockedGetPopularMovies.mockReturnValue(new Promise<TMDBResponse>(() => {}));
        
        renderMoviesPage();
        
        expect(screen.getAllByText(/loading/i).length).toBeGreaterThan(0);
    });

  it("displays popular movies after the request succeeds", async () => {
    mockedGetPopularMovies.mockResolvedValue(movieResponse([actionMovie, comedyMovie]));

    renderMoviesPage();

    expect(await screen.findByRole("heading", { name: /action movie/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /comedy movie/i })).toBeInTheDocument();
    expect(mockedGetPopularMovies).toHaveBeenCalledWith(1);
  });

  it("displays an error when popular movies cannot be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockedGetPopularMovies.mockRejectedValue(new Error("Network error"));

    renderMoviesPage();

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("searches for a movie using the entered title", async () => {
    const user = userEvent.setup();

    mockedGetPopularMovies.mockResolvedValue(movieResponse([actionMovie]));
    mockedSearchMovies.mockResolvedValue(movieResponse([searchedMovie]));

    renderMoviesPage();

    await screen.findByRole("heading", { name: /action movie/i });

    await user.type(screen.getByPlaceholderText(/search movies/i), "Batman");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(mockedSearchMovies).toHaveBeenCalledWith("Batman", 1);
    expect(await screen.findByRole("heading", { name: /batman/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /action movie/i })).not.toBeInTheDocument();
  });

  it("filters the displayed movies by genre", async () => {
    const user = userEvent.setup();

    mockedGetPopularMovies.mockResolvedValue(movieResponse([actionMovie]));
    mockedGetMoviesByGenre.mockResolvedValue(movieResponse([actionMovie]));

    renderMoviesPage();

    await screen.findByRole("heading", { name: /action movie/i });

    await user.selectOptions(screen.getByRole("combobox"), "28");

    expect(mockedGetMoviesByGenre).toHaveBeenCalledWith(28, 1);
    expect(await screen.findByRole("heading", { name: /action movie/i })).toBeInTheDocument();
  });

  it("displays feedback when no movies are returned", async () => {
    mockedGetPopularMovies.mockResolvedValue(movieResponse([]));

    renderMoviesPage();

    expect(await screen.findByText(/no movies were found/i)).toBeInTheDocument();
  });
});