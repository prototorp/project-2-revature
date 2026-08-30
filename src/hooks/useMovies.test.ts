import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovies } from "./useMovies";
import * as tmdbApi from "../services/tmdbApi";

vi.mock("../services/tmdbApi");

const mockResponse = {
  page: 1,
  results: [{ id: 1, title: "Test Movie", overview: "", poster_path: null, release_date: "2024-01-01", vote_average: 7 }],
  total_pages: 5,
  total_results: 100,
};

describe("useMovies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches popular movies on mount and sets loading correctly", async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useMovies());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual(mockResponse.results);
    expect(result.current.totalPages).toBe(5);
    expect(tmdbApi.getPopularMovies).toHaveBeenCalledWith(1);
  });

  it("sets an error message when the API call fails", async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network error");
    expect(result.current.movies).toEqual([]);
  });

  it("calls searchMovies instead of getPopularMovies once a search is triggered", async () => {
    vi.mocked(tmdbApi.getPopularMovies).mockResolvedValue(mockResponse);
    vi.mocked(tmdbApi.searchMovies).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.loading).toBe(false));

    result.current.search("batman");

    await waitFor(() => expect(tmdbApi.searchMovies).toHaveBeenCalledWith("batman", 1));
  });
});