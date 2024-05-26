import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useLoaderData } from "react-router-dom";

export async function moviesLoader() {
  const movies = await fetch("http://localhost:8080/api/movies").then((res) =>
    res.json()
  );
  return movies;
}

const Movies = () => {
  // const [movies, setMovies] = useState([]);

  // async function getMovies() {
  //   await fetch("http://localhost:8080/api/movies")
  //     .then((res) => res.json())
  //     .then((movies) => setMovies(movies));
  // }

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     await getMovies();
  //   };

  //   fetchMovies();

  //   return () => {};
  // }, []);
  const movies = useLoaderData();

  return (
    <div className="my-3 flex flex-col items-center gap-2">
      {movies && movies.length > 0
        ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        : "No movies to show"}
    </div>
  );
};

export default Movies;
