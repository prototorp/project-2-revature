import { useState, useEffect, type ChangeEvent } from "react";
import { getGenres } from "../../services/tmdbApi";
import type { Genre } from "../../types/movie";

interface MovieFiltersProps {
  onFilterChange: (genreId: number | null) => void;
}

function MovieFilters({ onFilterChange }: MovieFiltersProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();
        setGenres(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load genres"
        );
      }
    }

    fetchGenres();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGenre(value);

    if (value === "") {
      onFilterChange(null);
    } else {
      onFilterChange(Number(value));
    }
  };

  return (
    <div>
      <select value={selectedGenre} onChange={handleChange}>
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default MovieFilters;