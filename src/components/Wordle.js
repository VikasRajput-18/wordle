import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyUp, guesses, turn, isCorrect, usedKey } =
    useWordle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }
    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div>
      <div className="wordle">Current Guess : {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKey={usedKey} />
      { showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} /> }
        
    </div>
  );
};

export default Wordle;
