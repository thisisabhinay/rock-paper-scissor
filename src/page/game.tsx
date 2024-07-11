import React, { FC, useState } from "react"
import ChoiceSlot, {Choice} from "../component/ChoiceSlot"
import choices from "../data/choices"

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {

  const [choice, setChoice] = useState<Choice>(choices[7])

  const playerChoiceHandler = (choice: Choice) => {
    setChoice({...choice})
  }

  return (
    <main data-testid="game-page">
      <ChoiceSlot
        choices={choices}
        playerChoice={choice}
        enemy="en_9llziioCE0Mvp9ZyONNgb"
        onUpdate={playerChoiceHandler}
      />
    </main>
  )
}

export default GamePage
