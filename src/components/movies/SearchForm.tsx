import { useState, type FormEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [input, setInput] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (trimmed === "") {
      setValidationError("Please enter a search term.");
      return;
    }

    setValidationError(null);
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <button type="submit">Search</button>

      {validationError && (
        <div role="alert" style={{ color: "red" }}>
          {validationError}
        </div>
      )}
    </form>
  );
}

export default SearchForm;