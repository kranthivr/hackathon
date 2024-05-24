import React from "react";

const MovieCard = (props) => {
  const { movie } = props;
  return (
    <div className="max-w-md mx-auto my-3 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={movie.imgData}
            alt="Modern building architecture"
          />
        </div>
        <div className="p-8">
          <a
            href="#"
            className="block mt-1 text-lg leading-tight text-indigo-500 font-semibold hover:underline"
          >
            {movie.name}
          </a>
          {/* <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            Incredible accommodation for your team
          </a> */}
          <p className="mt-2 text-slate-500">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
