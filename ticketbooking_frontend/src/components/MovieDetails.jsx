import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import MovieCard from "./MovieCard";
import Calendar from "./Calendar";

export async function getMovieDetails({ params }) {
  const { id } = params;
  const movieDetails = await fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((res) => res.json());
  console.log(movieDetails);
  return movieDetails;
}

const MovieDetails = () => {
  const movieDetails = useLoaderData();
  return (
    <div className="my-3 flex flex-col items-center gap-2">
      <MovieCard movie={movieDetails} />
      <div className="flex flex-row justify-center gap-5">
        {movieDetails.showTimes && movieDetails.showTimes.length > 0 ? (
          movieDetails.showTimes.map((showTime) => (
            <Link
              key={showTime}
              to={`/movies/${movieDetails.id}/shows/${showTime}`}
              state={{ movieDetails, showTime }}
            >
              <Calendar
                className="shadow-md hover:shadow-lg"
                time={showTime}
              ></Calendar>
            </Link>
          ))
        ) : (
          <div>No Shows Available</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
