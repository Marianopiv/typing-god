import { useState } from "react"
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { Toast } from "../UI/CustomToast";

const useScores = () => {
    const [currentUserData, setCurrentUserData] = useState({
        name:"",
        score:"",
    })
    const [toogleButton, setToogleButton] = useState(false)

    const handleScore = (e) => {
        const {name,value} = e.target

        setCurrentUserData({...currentUserData,[name]:value})
    }

    const saveScore = async (text) => {
        try {
          const collectionRef = collection(db, `scores`);
          await addDoc(collectionRef, text);
          await Toast.fire({
            icon: "success",
            title: "Felicidades, su puntuación entro en el HighScore",
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
  return {currentUserData,handleScore,saveScore,setToogleButton,toogleButton}
}

export default useScores