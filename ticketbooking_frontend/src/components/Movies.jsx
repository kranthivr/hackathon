import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    await fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((movies) => setMovies(movies));
  }

  useEffect(() => {
    const fetchMovies = async () => {
      await getMovies();
    };

    fetchMovies();

    return () => {};
  }, []);

  return (
    <div>
      {movies && movies.length > 0
        ? movies.map((movie) => <MovieCard movie={movie} />)
        : "No movies to show"}
    </div>
  );
};

export default Movies;
