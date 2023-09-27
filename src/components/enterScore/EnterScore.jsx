/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useScores from "../../hook/useScores";
import { getFullScore } from "../../helper";

const EnterScore = ({
  highScores,
  changePhraseReset,
  setModal,
  setScore,
  score,
}) => {
  const {
    currentUserData,
    toogleButton,
    setToogleButton,
    handleScore,
    saveScore,
  } = useScores();

  useEffect(() => {}, [highScores]);

  const handlePlayAgain = () => {
    changePhraseReset();
    setScore([]), setModal(false);
  };

  const handleSaveScore = (userScore) => {
    setToogleButton(true);
    saveScore(userScore);
  };

  return (
    <div className="absolute bg-white rounded-md p-8 w-1/2 flex items-center flex-col justify-center h-96 top-16  shadow-2xl border-black border-2">
      <h1 className="text-2xl" style={{ fontFamily: "GodOfWar" }}>
        Anota tu puntuacion para ver si llegaste al salón de la fama.
      </h1>
      <span>Nombre:</span>
      <input
        onChange={(e) => handleScore(e)}
        name="name"
        className="border border-black ml-2 rounded-sm mt-2 text-center"
        type="text"
        maxLength={20}
      />
      <span>Score:</span>
      <input
        disabled
        value={getFullScore(score)}
        onChange={(e) => handleScore(e)}
        name="name"
        className="border border-black ml-2 rounded-sm mt-2 text-center"
        type="text"
      />
      <div className="flex gap-4 mt-10">
        <button
          style={{ fontFamily: "GodOfWar" }}
          disabled={toogleButton||currentUserData.name===""}
          className="bg-blue-950 text-white"
          onClick={() =>
            handleSaveScore({ ...currentUserData, score: getFullScore(score) })
          }
        >
          Save Score
        </button>
        <button
          style={{ fontFamily: "GodOfWar" }}
          className="bg-blue-950 text-white"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EnterScore;
