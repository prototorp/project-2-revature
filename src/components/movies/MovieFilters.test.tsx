import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("shows a validation error and does not call onSearch when input is empty", () => {
    const onSearch = vi.fn();
    render(<SearchForm onSearch={onSearch} />);

    fireEvent.click(screen.getByText("Search"));

    expect(screen.getByText(/please enter a search term/i)).toBeInTheDocument();
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("calls onSearch with trimmed input on valid submit", () => {
    const onSearch = vi.fn();
    render(<SearchForm onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/search movies/i), {
      target: { value: "  batman  " },
    });
    fireEvent.click(screen.getByText("Search"));

    expect(onSearch).toHaveBeenCalledWith("batman");
  });
});