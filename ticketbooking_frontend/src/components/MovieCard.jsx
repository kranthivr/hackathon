import React from "react";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { movie } = props;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={movie.imgData}
            alt="Modern building architecture"
          />
        </div>
        <div className="p-8">
          <Link
            to={`/movies/${movie.id}`}
            className="block mt-1 text-lg leading-tight text-indigo-500 font-semibold hover:underline"
          >
            {movie.name}
          </Link>
          <p className="mt-2 text-slate-500">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
