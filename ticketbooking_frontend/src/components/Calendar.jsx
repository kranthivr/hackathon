import React from "react";

const Calendar = (props) => {
  function convertDateString(timeString) {
    const date = new Date(timeString);
    const result = {
      dd: String(date.getDate()).padStart(2, "0"),
      mm: String(date.getMonth() + 1).padStart(2, "0"), // Months are zero-indexed,
      month: date.toLocaleString("default", { month: "long" }),
      yyyy: date.getFullYear(),
      hh: String(date.getHours()).padStart(2, "0"),
      min: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
      sss: String(date.getMilliseconds()).padStart(3, "0"),
    };
    return result;
  }
  const { time, className } = props;
  const { dd, month, mm, yyyy, hh, min, ss, sss } = convertDateString(time);

  return (
    <div className={className + " w-25 p-3 container rounded bg-cyan-300"}>
      <div className="grid justify-center">
        <div className="justify-self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="transparent"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <text
              x="50%"
              y="65%"
              className="font-sans"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="50%"
              strokeWidth={1}
            >
              {dd}
            </text>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              fill="none"
            />
          </svg>
        </div>
        <div>{`${month} ${yyyy}`}</div>
        <div className="text-center">
          {hh}:{min}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
