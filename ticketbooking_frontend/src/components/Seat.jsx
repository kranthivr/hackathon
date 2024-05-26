import React from "react";

const Seat = (props) => {
  const { seat } = props;
  return (
    <div
      key={seat.id}
      className="border border-sky-500 rounded-md w-10 h-10 text-center"
    >
      {seat.seatName}
    </div>
  );
};

export default Seat;
