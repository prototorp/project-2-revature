import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/movies" replace />} />

        <Route path="/movies" element={<MoviesPage />} />

        <Route
          path="/movies/:movieId"
          element={<MovieDetailsPage />}
        />

        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Route>
    </Routes>
  );
}

export default App;