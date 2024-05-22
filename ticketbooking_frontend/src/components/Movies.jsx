import React, { useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    await fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((movies) => setMovies(movies));
  }

  useEffect(() => {
    getMovies();
    return () => getMovies();
  }, []);

  return (
    <div>
      {movies && movies.length > 0
        ? movies.map((movie) => (
            <div className="container max-w-md mx-auto my-5" key={movie.id}>
              <a
                href="#"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.name}
                </h5>
              </a>
            </div>
          ))
        : "No movies to show"}
    </div>
  );
};

export default Movies;
