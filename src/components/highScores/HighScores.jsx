/* eslint-disable react/prop-types */

import { sortScores } from "../../helper";

const HighScores = ({ highScores }) => {
  return (
    <div className="mt-16 w-1/2 rounded-md h-96 relative flex flex-col items-center p-4 flex-wrap ">
      <h1
        className="text-center mx-auto pt-4 w-full"
        style={{ fontWeight: "bold", fontFamily: "GodOfWar" }}
      >
        Salon de la fama
      </h1>
      <div className="absolute -z-10 opacity-60 bg-white w-full rounded-md h-full"></div>
      {<div className="w-full flex flex-wrap">
        {highScores.length > 0 &&
          sortScores(highScores).slice(0,12).map(({ name, score }, index) => (
            <div
              className="flex gap-2 w-1/3 items-center text-xl p-2 text-black"
              key={index}
            >
              <p
                className="text-4xl"
                style={{ fontWeight: "bold", fontFamily: "GodOfWar" }}
              >
                {name}
              </p>
              <p className="font-bold pl-2">{score}</p>
            </div>
          ))}
      </div>}
    </div>
  );
};

export default HighScores;
