// components/movies/MovieFilters.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieFilters from "./MovieFilters";
import * as tmdbApi from "../../services/tmdbApi";

vi.mock("../../services/tmdbApi");

const mockGenres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
];

describe("MovieFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads and displays genres on mount", async () => {
    vi.mocked(tmdbApi.getGenres).mockResolvedValue(mockGenres);

    render(<MovieFilters onFilterChange={vi.fn()} />);

    expect(await screen.findByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  it("calls onFilterChange with the numeric genre id when a genre is selected", async () => {
    vi.mocked(tmdbApi.getGenres).mockResolvedValue(mockGenres);
    const onFilterChange = vi.fn();

    render(<MovieFilters onFilterChange={onFilterChange} />);
    await screen.findByText("Action");

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "28" } });

    expect(onFilterChange).toHaveBeenCalledWith(28);
  });

  it("calls onFilterChange with null when 'All genres' is selected", async () => {
    vi.mocked(tmdbApi.getGenres).mockResolvedValue(mockGenres);
    const onFilterChange = vi.fn();

    render(<MovieFilters onFilterChange={onFilterChange} />);
    await screen.findByText("Action");

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    expect(onFilterChange).toHaveBeenCalledWith(null);
  });

  it("shows an error message if genres fail to load", async () => {
    vi.mocked(tmdbApi.getGenres).mockRejectedValue(new Error("Failed to load genres"));

    render(<MovieFilters onFilterChange={vi.fn()} />);

    expect(await screen.findByText("Failed to load genres")).toBeInTheDocument();
  });
});