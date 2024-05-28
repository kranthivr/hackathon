import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import MovieCard from "./MovieCard";
import Seat from "./Seat";
import { useAuth } from "./auth";

export async function getTickets({ params }) {
  const { id, showTime } = params;
  const tickets = await fetch(
    `http://localhost:8080/api/movies/${id}/shows/${showTime}`
  ).then((res) => res.json());
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
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { movieDetails, showTime } = location.state;
  const loaderData = useLoaderData();
  const [tickets, setTickets] = useState(loaderData);
  const [rows, setRows] = useState(convertTicketsToRows(tickets));

  const selectedSeatsCount = () => {
    return tickets.reduce((acc, curr) => acc + (curr.selected ? 1 : 0), 0);
  };

  function handleSeatSelect(selectedSeat) {
    if (!selectedSeat.booked) {
      let selectedSeatCount = selectedSeatsCount();
      if (!selectedSeat.selected && selectedSeatCount === 5) {
        alert("You can select maximum 5 seats");
        return;
      }
      const updatedTickets = tickets.map((seat) => {
        if (seat.id === selectedSeat.id) {
          return { ...seat, selected: !seat.selected };
        }
        return seat;
      });
      setTickets(updatedTickets);
    }
  }

  async function handlePayment() {
    if (auth.user) {
      const selectedTicketIds = tickets
        .filter((ticket) => ticket.selected)
        .map((ticket) => ticket.id);
      const data = { user: auth.user, ticketIds: selectedTicketIds };
      console.log(data);
      const res = await fetch("http://localhost:8080/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.text());
      alert(res);
      navigate("/");
    } else {
      alert("You need to login to pay");
      navigate("/");
    }
  }

  useEffect(() => {
    setRows(convertTicketsToRows(tickets));
    selectedSeatsCount();
  }, [tickets]);

  return (
    <div className="mt-5 flex flex-col items-center gap-2 pb-36 mb-3">
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
                  <Seat
                    key={seat.id}
                    seat={seat}
                    handleSeatSelect={handleSeatSelect}
                  />
                ))}
              </div>
            ))}

          <div className="mt-4 mb-2 border border-2 border-indigo"></div>
          <div className="text-center">Screen this way</div>
        </div>
      </div>
      {selectedSeatsCount() > 0 && (
        <button
          className="py-2 px-3 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-blue-500/50 focus:outline-none"
          onClick={handlePayment}
        >
          Proceed to Pay
        </button>
      )}
    </div>
  );
};

export default Tickets;
