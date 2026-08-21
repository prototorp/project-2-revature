import { useEffect, useState } from "react";
import { fetchTMDB, searchMovies, getMovieDetails } from "./services/tmdbApi";
import type { Movie, MovieDetails as MovieDetailsType } from "./types/movie";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";

//import { getMovie } from "../services/tmdbApi";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const handleSelectMovie = (id: number) => {
    getMovieDetails(id)
      .then((data) => {
        setSelectedMovie(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
useEffect(() => {
  setLoading(true);
  setError("");

  if (search.trim() === "") {
    fetchTMDB("movie/popular")
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load movies.");
        setLoading(false);
      });
  } else {
    searchMovies(search)
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load movies.");
        setLoading(false);
      });
  }
}, [search]);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
           {loading && <p>Loading movies...</p>}
           {error && <p>{error}</p>}
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
      <MovieGrid movies={movies} onSelect={handleSelectMovie} />
    </div>
  );
}

export default App;
