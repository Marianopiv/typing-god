import { useState } from "react";
import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { Toast } from "../UI/CustomToast";
import { sortScores } from "../helper";

const useScores = () => {
  const [currentUserData, setCurrentUserData] = useState({
    name: "",
    score: "",
  });
  const [toogleButton, setToogleButton] = useState(false);

  const handleScore = (e) => {
    const { name, value } = e.target;

    setCurrentUserData({ ...currentUserData, [name]: value });
  };

  const saveScore = async (objScore, highScores) => {
    console.log(objScore, "esto cae objScore");
    console.log(highScores, "esto es highScores");

    const isLessThanTwelve = (arr) => {
      //Si es menor a 13 logica para cuando no hay 13 resultados
      return arr.length < 13;
    };
    try {
      const collectionRef = collection(db, `scores`);
      await addDoc(collectionRef, objScore);
      await Toast.fire({
        icon: "success",
        title: `${
          (isLessThanTwelve(highScores)
            ? sortScores(highScores)[highScores.length - 1].score >
              objScore.score
            : sortScores(highScores)[11].score > objScore.score)
            ? "Puntaje guardado, no llegaste al salon de la fama, probá nuevamente!"
            : "Felicidades! entraste al salon de la fama"
        }`,
      });
      return;
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return {
    currentUserData,
    handleScore,
    saveScore,
    setToogleButton,
    toogleButton,
  };
};

export default useScores;
