import { useState, type FormEvent } from "react";

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [input, setInput] = useState("");
  const [validationError, setValidationError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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