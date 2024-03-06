import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { IoIosClose, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

interface Props {
  type: number;
  icon?: ReactNode;
  click: () => void;
}
const Box = forwardRef(
  ({ type, icon, click }: Props, ref: React.Ref<{ roll: () => void }>) => {
    useImperativeHandle(ref, () => ({
      roll: rollDice,
    }));

    function rollDice() {
      if (type == 20) {
        const newDice = [...dice];
        newDice.map((_, i) => {
          newDice[i].num = Math.floor(Math.random() * type + 1);
          newDice[i].succeed = newDice[i].num >= DC;
        });
        setDice(newDice);
      } else {
        const newDice = [...dice];
        newDice.map((_, i) => {
          newDice[i].num = Math.floor(Math.random() * type + 1);
        });
        setDice(newDice);
      }
    }
    const [dice, setDice] = useState<{ num: number; succeed: boolean }[]>([
      { num: 1, succeed: true },
    ]);

    const [DC, setDC] = useState<number>(0);

    const [hoverStates, setHoverStates] = useState(
      Array(dice.length).fill(false)
    );

    const [diceCount, setDiceCount] = useState<number>(1);

    return (
      <div
        className={`w-[200px] h-[300px] relative rounded-2xl bg-slate-500  flex-col items-center justify-between p-3 flex`}
      >
        <button className="absolute right-5 w-[20px] h-[20px]" onClick={click}>
          <IoIosClose className="w-full h-full" />
        </button>
        <div className="flex flex-col items-center w-full gap-2">
          <button
            className="w-[25px] h-[25px] flex justify-center"
            onClick={rollDice}
          >
            {icon}
          </button>
          <div className="w-full max-h-[190px] grid grid-cols-3 gap-3 place-items-center overflow-auto">
            {dice.map((die, i) => (
              <button
                key={i}
                className="min-w-[35px] h-[35px] rounded-full flex  justify-center items-center hover:bg-gray-950"
                style={{
                  backgroundColor: die.succeed ? "green" : "red",
                }}
                onMouseEnter={() => {
                  const updatedHoverStates = [...hoverStates];
                  updatedHoverStates[i] = true;
                  setHoverStates(updatedHoverStates);
                }}
                onMouseLeave={() => {
                  const updatedHoverStates = [...hoverStates];
                  updatedHoverStates[i] = false;
                  setHoverStates(updatedHoverStates);
                }}
                onClick={() => {
                  const updatedDice = [...dice];
                  updatedDice.splice(i, 1); // Remove the element at the specified index
                  setDice(updatedDice); // Update the state with the modified array
                }}
              >
                {hoverStates[i] ? <BiTrash /> : die.num}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full inline-flex justify-between gap-2">
          <button
            className="flex justify-center items-center w-1/4 p-0"
            onClick={() => {
              const newDice = [
                ...dice,
                ...Array(diceCount).fill({ num: 1, succeed: true }),
              ]; // Add a new element to the array
              setDice(newDice); // Update the state with the new array
            }}
          >
            <IoMdAddCircle />
          </button>
          <button
            className="flex justify-center items-center w-1/4 p-0"
            onClick={() => {
              const newDice = [...dice]; // Add a new element to the array
              newDice.splice(0, diceCount);
              setDice(newDice); // Update the state with the new array
            }}
          >
            <IoMdRemoveCircle />
          </button>
          <input
            type="number"
            className="w-1/4 rounded-lg p-1"
            alt="Modifier"
            min={1}
            onChange={(event) => setDiceCount(parseInt(event.target.value))}
          />
        </div>
        {type == 20 && (
          <input
            type="number"
            placeholder="DC"
            className="px-2 max-w-full rounded-md h-[30px]"
            onChange={(event) => setDC(parseInt(event.target.value))}
          />
        )}
      </div>
    );
  }
);

export default Box;
