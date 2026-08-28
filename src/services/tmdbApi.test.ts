import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockGet } = vi.hoisted(() => {
  return { mockGet: vi.fn() };
});

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({ get: mockGet })),
  },
}));

import { getMoviesByGenre } from "./tmdbApi";

describe("getMoviesByGenre", () => {
  beforeEach(() => {
    mockGet.mockClear();
  });

  it("calls /discover/movie with the correct with_genres param", async () => {
    mockGet.mockResolvedValue({
      data: { page: 1, results: [], total_pages: 1, total_results: 0 },
    });

    await getMoviesByGenre(28, 1);

    expect(mockGet).toHaveBeenCalledWith("/discover/movie", {
      params: { with_genres: 28, page: 1 },
    });
  });
});