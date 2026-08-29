import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SearchForm from "./SearchForm";

const testGenres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 35,
    name: "Comedy",
  },
];

function renderSearchForm() {
  const onSearch = vi.fn();
  const onGenreChange = vi.fn();

  render(
    <SearchForm
      onSearch={onSearch}
      genres={testGenres}
      selectedGenre=""
      onGenreChange={onGenreChange}
    />,
  );

  return {
    onSearch,
    onGenreChange,
  };
}

describe("SearchForm", () => {
  it("shows a validation error for an empty search", async () => {
    const user = userEvent.setup();
    const { onSearch } = renderSearchForm();

    await user.click(
      screen.getByRole("button", {
        name: /^search$/i,
      }),
    );

    expect(
      screen.getByText(/enter a movie title/i),
    ).toBeInTheDocument();

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("submits a trimmed movie title", async () => {
    const user = userEvent.setup();
    const { onSearch } = renderSearchForm();

    await user.type(
      screen.getByPlaceholderText(/search movies/i),
      "  Batman  ",
    );

    await user.click(
      screen.getByRole("button", {
        name: /^search$/i,
      }),
    );

    expect(onSearch).toHaveBeenCalledWith(
      "Batman",
    );
  });

  it("reports the selected genre", async () => {
    const user = userEvent.setup();
    const { onGenreChange } = renderSearchForm();

    await user.selectOptions(
      screen.getByRole("combobox"),
      "28",
    );

    expect(
      onGenreChange,
    ).toHaveBeenCalledWith("28");
  });

  it("clears the input and requests popular movies", async () => {
    const user = userEvent.setup();
    const { onSearch } = renderSearchForm();

    const searchInput =
      screen.getByPlaceholderText(
        /search movies/i,
      );

    await user.type(searchInput, "Batman");

    await user.click(
      screen.getByRole("button", {
        name: /^all$/i,
      }),
    );

    expect(searchInput).toHaveValue("");
    expect(onSearch).toHaveBeenCalledWith("");
  });
});