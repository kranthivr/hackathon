import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Movies, { moviesLoader } from "./components/Movies";
import Root from "./components/Root";
import "./index.css";
import MovieDetails, { getMovieDetails } from "./components/MovieDetails";
import Tickets, { getTickets } from "./components/Tickets";
import { AuthProvider } from "./components/auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login />} />
      <Route path="/movies" loader={moviesLoader} element={<Movies />} />
      <Route
        path="/movies/:id"
        loader={getMovieDetails}
        element={<MovieDetails />}
      />
      <Route
        path="/movies/:id/shows/:showTime"
        loader={getTickets}
        element={<Tickets />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
