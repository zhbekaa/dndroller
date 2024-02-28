import { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";

function App() {
  const [dice, setDice] = useState<number>(20);
  const [modifier, setModifier] = useState<number>(0);
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <Dice diceNumber={dice} bonus={modifier}/>
        <input
          className="rounded-xl p-2"
          type="number"
          placeholder="Modifier"
          onChange={(event) => {
            setModifier(parseInt(event.target.value));
          }}
        />
        <button
          onClick={() => {
            const random = getRandomInt(1, 20);
            setDice(random);
            console.log(random, modifier);
          }}
        >
          Roll
        </button>
      </div>
    </>
  );
}

export default App;
