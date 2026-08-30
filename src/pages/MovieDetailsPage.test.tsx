import {
  render,
  screen,
} from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import MovieDetailsPage from "./MovieDetailsPage";
import { getMovieDetails } from "../services/tmdbApi";
import type { MovieDetails } from "../types/movie";

vi.mock("../services/tmdbApi", () => ({
  getMovieDetails: vi.fn(),
}));

const mockedGetMovieDetails =
  vi.mocked(getMovieDetails);

const movieDetails: MovieDetails = {
  id: 123,
  title: "Test Movie",
  overview: "A movie used for testing.",
  poster_path: "/test-movie.jpg",
  release_date: "2025-06-15",
  vote_average: 8.5,
  genre_ids: [28],
  genres: [
    {
      id: 28,
      name: "Action",
    },
  ],
  runtime: 125,
  tagline: "The test begins.",
  release_dates: {
    results: [
      {
        iso_3166_1: "US",
        release_dates: [
          {
            certification: "PG-13",
            release_date:
              "2025-06-15T00:00:00.000Z",
            type: 3,
          },
        ],
      },
    ],
  },
};

function renderMovieDetails(
  initialRoute = "/movies/123",
) {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route
          path="/movies/:movieId"
          element={<MovieDetailsPage />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("MovieDetailsPage", () => {
  it("displays a loading message while details are requested", () => {
    mockedGetMovieDetails.mockReturnValue(
      new Promise<MovieDetails>(() => {}),
    );

    renderMovieDetails();

    expect(
      screen.getByText(
        /loading movie details/i,
      ),
    ).toBeInTheDocument();
  });

  // it("displays the movie details after a successful request", async () => {
  //   mockedGetMovieDetails.mockResolvedValue(
  //     movieDetails,
  //   );

  //   renderMovieDetails();

  //   expect(
  //     await screen.findByRole("heading", {
  //       name: /test movie/i,
  //     }),
  //   ).toBeInTheDocument();

  //   expect(
  //     mockedGetMovieDetails,
  //   ).toHaveBeenCalledWith(123);

  //   expect(
  //     screen.getByText(
  //       /a movie used for testing/i,
  //     ),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByText(/the test begins/i),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByText(/8\.5/),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByText(/125 minutes/i),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByText("Action"),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByText("PG-13"),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByRole("img", {
  //       name: /test movie poster/i,
  //     }),
  //   ).toBeInTheDocument();

  //   expect(
  //     screen.getByRole("link", {
  //       name: /back to movies/i,
  //     }),
  //   ).toHaveAttribute("href", "/movies");
  // });

  // it("displays not rated when no US certification exists", async () => {
  //   mockedGetMovieDetails.mockResolvedValue({
  //     ...movieDetails,
  //     release_dates: {
  //       results: [],
  //     },
  //   });

  //   renderMovieDetails();

  //   expect(
  //     await screen.findByText(/not rated/i),
  //   ).toBeInTheDocument();
  // });

  it("displays an error when the details request fails", async () => {
    vi.spyOn(
      console,
      "error",
    ).mockImplementation(() => {});

    mockedGetMovieDetails.mockRejectedValue(
      new Error("Network error"),
    );

    renderMovieDetails();

    expect(
      await screen.findByText(
        /failed to load movie details/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        /loading movie details/i,
      ),
    ).not.toBeInTheDocument();
  });

  it("rejects an invalid movie ID without making an API request", () => {
    renderMovieDetails(
      "/movies/not-a-number",
    );

    expect(
      screen.getByText(/invalid movie id/i),
    ).toBeInTheDocument();

    expect(
      mockedGetMovieDetails,
    ).not.toHaveBeenCalled();
  });
});