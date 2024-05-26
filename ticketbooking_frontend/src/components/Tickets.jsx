import React from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Seat from "./Seat";
import MovieDetails from "./MovieDetails";
import MovieCard from "./MovieCard";
import Calendar from "./Calendar";

export async function getTickets({ params }) {
  const { id, showTime } = params;
  const tickets = await fetch(
    `http://localhost:8080/api/movies/${id}/shows/${showTime}`
  ).then((res) => res.json());
  console.log(tickets);
  return tickets;
}

function convertTicketsToRows(tickets) {
  let rows = {};
  tickets.forEach((ticket) => {
    let rowName = ticket.seatName[0];
    if (rows[rowName]) {
      rows[rowName].push(ticket);
    } else {
      let row = [];
      row.push(ticket);
      rows[rowName] = row;
    }
  });
  return rows;
}

const Tickets = () => {
  const tickets = useLoaderData();
  const location = useLocation();
  const { movieDetails, showTime } = location.state;
  const rows = convertTicketsToRows(tickets);
  return (
    <div className="my-2 flex flex-col items-center gap-2">
      <MovieCard movie={movieDetails} />
      <div className="flex mx-auto items-center gap-3">
        <div>
          <Calendar time={showTime} />
        </div>
        <div className="grid justify-center p-3">
          {rows &&
            Object.entries(rows).map((row) => (
              <div
                key={row[0]}
                className="flex flex-row align-center gap-2 mb-2"
              >
                {row[1].map((seat) => (
                  <Seat key={seat.id} seat={seat} />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
