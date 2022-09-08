import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKey, setUsedKey] = useState({});

  const formatGuess = () => {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // find any green letter

    formattedGuess.forEach((letter, id) => {
      if (solutionArray[id] === letter.key) {
        formattedGuess[id].color = "green";
        solutionArray[id] = null;
      }
    });

    // find any yellow letter

    formattedGuess.forEach((letter, id) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[id].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formatGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuess) => {
      let newGuess = [...prevGuess];
      newGuess[turn] = formatGuess;
      return newGuess;
    });
    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);

    setUsedKey((prevUsedKey) => {
      let newKey = { ...prevUsedKey };
      formatGuess.forEach((guess) => {
        const currentColor = newKey[guess.key];
        if (guess.color === "green") {
          newKey[guess.key] = "green";
          return;
        }
        if (guess.color === "yellow" && currentColor !== "green") {
          newKey[guess.key] = "yellow";
          return;
        }
        if (
          guess.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKey[guess.key] = "grey";
          return;
        }
      });
      return newKey
    });
    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("you useda all your guesses");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("you already tried this word");
        return;
      }

      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, guesses, currentGuess, isCorrect, usedKey, handleKeyUp };
};

export default useWordle;
