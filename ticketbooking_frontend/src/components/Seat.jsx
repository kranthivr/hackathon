import React from "react";

const Seat = (props) => {
  const { seat, handleSeatSelect } = props;
  return (
    <div
      key={seat.id}
      className={`border border-sky-500 ${
        seat.selected &&
        "bg-orange-500 border-orange-700 shadow-md shadow-orange-300 text-white"
      } ${!seat.booked && "cursor-pointer"} ${
        seat.booked && "bg-gray-200 cursor-not-allowed border-gray-700"
      } rounded-md w-10 h-10 text-center`}
      onClick={() => handleSeatSelect(seat)}
    >
      {seat.seatName}
    </div>
  );
};

export default Seat;
