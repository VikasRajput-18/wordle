import React, { useEffect, useState } from "react";

const Keypad = ({ usedKey }) => {
  const [letters, setLetters] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((data) => setLetters(data));
  }, []);
  return (
    <div className="keypad">
      {letters &&
        letters.map((letter, id) => {
          const color = usedKey[letter.key];
          return (
            <div key={id} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
};

export default Keypad;
