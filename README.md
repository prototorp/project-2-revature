# MovieDB

MovieDB is a React + TypeScript web application that allows users to browse movies, search for movies, filter results by genre, and view detailed movie information.

The application uses the TMDB REST API to retrieve movie data and React Router for client-side navigation and protected routes.

## Features

- User login and logout
- Persistent authentication using browser local storage
- Protected movie routes
- Browse popular movies
- Search movies by title
- Filter movies by genre
- View detailed information for an individual movie
- Loading states while API requests are running
- Error messages for failed API requests
- Form validation for empty search input
- Responsive user interface
- Client-side navigation without full-page refreshes
- Login success message after authentication

## Technologies

- React
- TypeScript
- Vite
- React Router
- Bootstrap
- TMDB REST API
- Browser localStorage

## Project Structure

```text
src/
├── components/
│   ├── common/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── movies/
│       ├── MovieCard.tsx
│       ├── MovieGrid.tsx
│       └── SearchForm.tsx
├── constants/
│   └── genres.ts
├── context/
│   ├── AuthContext.tsx
│   └── FavoriteContext.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── MoviesPage.tsx
│   └── MovieDetailsPage.tsx
├── services/
│   └── tmdbApi.ts
├── types/
│   └── movie.ts
├── App.tsx
└── main.tsx

Architecture

The application separates responsibilities between components, pages, services, context, and routing.

Components

Reusable UI elements such as the header, search form, movie cards, and movie grid.

Pages

Application pages including the login page, movies page, and movie details page.

Services

The service contains reusable functions for communicating with the TMDB API.tmdbApi.ts

Routing

React Router handles navigation between pages and protects authenticated routes.

State Management

React Hooks and Context are used to manage authentication state, movie data, loading states, errors, and filtering.

API

Movie data is retrieved from the TMDB API.

The application uses:

Popular movies
Movie search
Movie details

The TMDB API base URL is:

https://api.themoviedb.org/3

An API read access token is stored in an environment variable.

Environment Variables

Create a file in the project root:.env

VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token

Do not commit your actual API token to Git.

Installation

Install the project dependencies:

npm install
Run the Application

Start the development server:

npm run dev

Then open the local URL provided by Vite, usually:

http://localhost:5173

Authentication

The application provides a simple frontend authentication flow.

Users enter a username and password on the login page. For this project, the credentials are only validated for non-empty input; authentication is represented using application state and browser local storage.

Successful login redirects the user to ./movies

Protected routes redirect unauthenticated users to ./login

Logging out clears the authentication state and returns the user to the login page.

Routes
Route	Description	Protected
/login	Login page	No
/movies	Browse, search, and filter movies	Yes
/movies/:movieId	Movie details	Yes
/	Redirects to login	No
Validation and Error Handling

The application validates user input and displays meaningful feedback.

Examples include:

Empty search input
Invalid movie ID
Failed movie API requests
Failed movie details requests
No movies found
Testing and Validation

The following functionality has been manually verified:

Login navigation
Logout navigation
Persistent authentication
Protected routes
Movie loading
Movie search
Genre filtering
Movie details
Back-to-Movies navigation
API error handling
Search validation
Responsive layout
Known Limitations

This project uses a simplified frontend authentication system for demonstration purposes.

It does not provide:

Real user registration
Backend credential verification
Database-backed user accounts
Production-level authentication or authorization