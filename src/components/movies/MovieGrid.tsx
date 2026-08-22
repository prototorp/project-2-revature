import MovieCard from "./MovieCardComponent";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <section className="container">
      <div className="row">
        {movies.map((movie) => (
          <div
            className="col-sm-6 col-md-4 col-lg-3 mb-4"
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieGrid;