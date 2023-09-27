import { useEffect, useState } from "react";
import { motivationalPhrases } from "../config/config";
import {
  filterCorrect,
  filterWordIndex,
  getFullScore,
  getRandomPos,
  splitMapReturnObjs,
} from "../helper";
import EnterScore from "../components/enterScore/EnterScore";
import HighScores from "../components/highScores/HighScores";
import typingGod from "../assets/typingGod.jpg";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Home = () => {
  const [phrase, setPhrase] = useState(
    splitMapReturnObjs(motivationalPhrases[getRandomPos(motivationalPhrases)])
  );
  const [hit, setHit] = useState("");
  const [done, setDone] = useState([]);
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(15);
  const [score, setScore] = useState([0]);
  const [modal, setModal] = useState(false);
  const [highScores, setHighScores] = useState([]);

  const compare = (e) => {
    setHit(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      if (counter < 1) {
        setDone([...done, { hit, correct: phrase[0].phrase === hit }]);
        setPhrase(filterWordIndex(phrase, counter));
        setHit(""); // Reinicia el valor de hit
        setCounter(counter + 1);
        return;
      }
      setDone([...done, { hit, correct: phrase[0].phrase === hit }]);
      if (phrase[0].phrase === hit) {
        setPhrase(filterWordIndex(phrase, counter));
        setCounter(counter + 1);
      }
      setHit(""); // Reinicia el valor de hit
    }
  };

  const changeFrase = () =>
    setPhrase(
      splitMapReturnObjs(motivationalPhrases[getRandomPos(motivationalPhrases)])
    );

  const changePhraseReset = () => {
    changeFrase();
    setDone([]);
    setCounter(0);
    setHit("");
    setTime(15);
    setScore([...score, filterCorrect(done)]);
  };

  useEffect(() => {
    if (phrase.length < 1 && score.length < 5) {
      changePhraseReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score,time]);

  useEffect(() => {
    if (score.length < 5) {
      const temporizador = setInterval(() => {
        if (time === 0) {
          clearInterval(temporizador);
          changePhraseReset();
          setTime(15);
        } else {
          setTime(time - 1);
        }
      }, 1000);

      return () => {
        clearInterval(temporizador);
      };
    } else {
      setModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, score]);

  useEffect(() => {
    const collectionRef = collection(db, "scores");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        score: doc.data().score,
        ...doc.data(),
      }));
      setHighScores(updatedData);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      {" "}
      <img
        className="absolute w-screen h-screen -z-50 top-0"
        src={typingGod}
        alt=""
      />
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1
          className="text-9xl text-red-900"
          style={{ fontFamily: "GodOfWar" }}
        >
          Typing God
        </h1>
        <div className="flex gap-4 font-bold text-2xl">
          <p>Score actual: {score.length > 0 && getFullScore(score)}</p>
          <p>Tiempo restante por frase:{time}</p>
        </div>
        <div className="flex gap-2 flex-wrap relative p-3 items-center">
        <div className="absolute -z-10 opacity-80 bg-white w-full rounded-md h-full"></div>
          {done.map((word, index) => {
            return (
              <span
                className={`${
                  word.correct
                    ? "text-green-500 text-4xl rounded-sm"
                    : "line-through text-4xl rounded-sm"
                }`}
                key={index}
              >
                {word.hit}
              </span>
            );
          })}
          {phrase.map((word, index) => (
            <p className={`text-4xl `} key={index}>
              {word.phrase}
            </p>
          ))}
        </div>
        <div className="">
          <span className="font-bold"></span>
        </div>
        <input
          placeholder="Escribi aqui las frases que ves en pantalla"
          className="border border-black text-3xl rounded-sm w-4/6 text-center"
          onKeyDown={handleKeyPress}
          value={hit}
          onChange={compare}
          type="text"
        />
      </div>
      {modal && (
        <EnterScore
          changePhraseReset={changePhraseReset}
          setScore={setScore}
          modal={modal}
          score={score}
          highScores={highScores}
          setModal={setModal}
          setHighScores={setHighScores}
        />
      )}
      <HighScores highScores={highScores} />
    </>
  );
};

export default Home;
