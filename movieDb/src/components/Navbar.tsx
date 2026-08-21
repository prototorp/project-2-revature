import { useState } from "react";

interface NavarProps {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar = ({ search, setSearch }: NavarProps) => {
  const [input, setInput] = useState(search);

  return (
    <nav className="movie-navbar navbar bg-dark p-3">
      <div className="container">
        <h1 className="navbar-brand text-white">
          <i className="bi bi-film me-2"></i>
          MovieDB
        </h1>
        <input
          className="form-control"
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => {
            //console.log("", e.target.value);
            setInput(e.target.value);
          }}
        />
        <button className="btn btn-primary" onClick={() => setSearch(input)}>
          Search
        </button>
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setInput("");
          setSearch("");
        }}
      >
        All
      </button>
    </nav>
  );
};
export default Navbar;
