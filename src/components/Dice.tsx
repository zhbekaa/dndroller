interface Props {
    diceNumber: number,
    bonus: number | undefined | null
}

export default function Dice({diceNumber, bonus} : Props) {

    return (
        <div>
            Dice:  {diceNumber} {bonus ? `+ ${bonus} = ${diceNumber + bonus}` : ""}
        </div>

    )
}
