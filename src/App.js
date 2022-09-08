import React, { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

const App = () => {
  const [solutions, setSolutions] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3001/solutions")
        .then((res) => res.json())
        .then((data) => {
          const randomSolution = data[Math.floor(Math.random() * data.length)];
          setSolutions(randomSolution.word);
        });
    };
    fetchData();
  }, [setSolutions]);

  return (
    <div>
      <h1 className="title">Wordle</h1>
      {solutions && <Wordle solution={solutions} />}
    </div>
  );
};

export default App;
