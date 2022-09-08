import React from "react";

const Row = ({ guess, currentGuess }) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((g, id) => {
          return (
            <div key={id} className={g.color}>
              {g.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    let letters = [...currentGuess];

    return (
      <div className="row current">
        {letters.map((g, id) => {
          return (
            <div key={id} className="filled">
              {g}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((letter, id) => {
          return <div key={id}></div>;
        })}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
