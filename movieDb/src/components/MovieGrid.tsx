import type { Movie } from "../types/movie";
import MovieCard from "./MovieCardComponent";

interface MovieGridProps {
  movies: Movie[];
      onSelect: (id: number) => void;

}

const MovieGrid = ({ movies,onSelect }: MovieGridProps) => {
  return (
    <div className="container">

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 col-lg-3 mb-4" key={movie.id}>
          
            <MovieCard movie={movie}  onSelect={onSelect} />
         </div>

        ))}
        </div>
    </div>
  );
};

export default MovieGrid;
