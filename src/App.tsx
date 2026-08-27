import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/layout/Layout";

import AboutPage from "./pages/AboutPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Navigate to="/movies" replace />
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/movies"
          element={<MoviesPage />}
        />

        <Route
          path="/movies/:movieId"
          element={<MovieDetailsPage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;