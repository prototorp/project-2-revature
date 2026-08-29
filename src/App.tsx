import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Opening "/" → Login */}
      <Route
        index
        element={<Navigate to="/login" replace />}
      />

      <Route path="*" element={<NotFoundPage />} />

      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            path="/movies"
            element={<MoviesPage />}
          />

          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;