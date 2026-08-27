import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="container py-5">
      <h1>Page not found</h1>

      <p className="mb-4">
        The page requested does not exist.
      </p>

      <Link
        className="btn btn-primary"
        to="/movies"
      >
        Return to movies
      </Link>
    </section>
  );
}

export default NotFoundPage;