import { useState, type SyntheticEvent } from "react";

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  genres: { id: number; name: string }[];
  selectedGenre: string;
  onGenreChange: (genreId: string) => void;
}

function SearchForm({
  onSearch,
  genres,
  selectedGenre,
  onGenreChange,
}: SearchFormProps) {
  const [input, setInput] = useState("");
  const [validationError, setValidationError] = useState("");

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setValidationError("Enter a movie title.");
      return;
    }

    setValidationError("");
    onSearch(trimmedInput);
  }

  function handleReset() {
    setInput("");
    setValidationError("");
    onSearch("");
  }

  return (
    <section className="container my-4">
      <form
        className="d-flex flex-column flex-sm-row gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="btn btn-primary" type="submit">
          Search
        </button>

        <select
          className="form-select"
          value={selectedGenre}
          onChange={(event) => onGenreChange(event.target.value)}
        >
          <option value="">All Genres</option>

          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleReset}
        >
          All
        </button>
      </form>

      {validationError && (
        <p className="text-danger mt-2">{validationError}</p>
      )}
    </section>
  );
}

export default SearchForm;