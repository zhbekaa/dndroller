// import { useState } from "react";
import { ReactNode, useRef, useState } from "react";
import "./App.css";

import Box from "./components/Box";
import { FaDiceD20 } from "react-icons/fa";
interface BoxInterface {
  id: number;
  type: number;
  icon?: ReactNode;
}
function App() {
  const boxRefs = useRef<Array<{ roll: () => void } | null>>([]); // Initialize refs with null
  const diceTypes = [4, 6, 8, 12, 20];
  const [counter, setCounter] = useState<number>(2);
  const [boxes, setBoxes] = useState<BoxInterface[]>([
    {
      type: 20,
      id: 1,
      icon: <FaDiceD20 className="w-full h-full" />,
    },
  ]);


  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="inline-flex w-full justify-between *:w-[50px]">
        {diceTypes.map((type, i) => (
          <button
            key={i}
            onClick={() => {
              const newBoxes = [...boxes];
              setCounter(counter => counter + 1)
              console.log(counter)
              newBoxes.push({
                id: counter,
                type: type,
                icon: <span>{type}</span>,
              });
              setBoxes(newBoxes);
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="inline-flex gap-5">
        {boxes.map((box, i) => (
          <Box
            key={box.id}
            icon={box.icon}
            type={box.type}
            click={() => {
              console.log(box.id)
              setBoxes((prevBoxes) =>
                prevBoxes.filter((prevBox) => prevBox.id !== box.id)
              );
            }}
            ref={(boxRef) => (boxRefs.current[i] = boxRef)} // Store ref in boxRefs array
          ></Box>
        ))}
      </div>

      <button
        className="self-center h-[50px] w-[200px]"
        onClick={() => {
          boxRefs.current.forEach((boxRef) => {
            if (boxRef) {
              boxRef.roll();
            }
          });
        }}
      >
        Roll
      </button>
    </div>
  );
}

export default App;
