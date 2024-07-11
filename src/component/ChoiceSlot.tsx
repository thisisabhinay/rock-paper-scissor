import React, { FC, useState, useMemo } from "react"
import Images from "../assets/choices"

export type Choice = {
  id: string
  key: string
  label: string
  damage: number
  resistance: number
  energy: number
  image: string
}

interface ChoiceSlotProps {
  choices: Choice[]
  playerChoice: Choice
  enemy: string
  onUpdate: (choice: Choice) => void
}

const ChoiceSlot: FC<ChoiceSlotProps> = ({
  choices,
  playerChoice,
  enemy,
  onUpdate,
}) => {
  const flexLayout = "flex items-center gap-2"
  const defaultBorder = "border-2 border-solid p-1 border-slate-800"

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isValidPlayerChoice = useMemo<boolean>(() => {
    if (typeof playerChoice !== "object" || playerChoice === null) {
      return false
    }

    if (typeof playerChoice.id !== "string") return false
    if (typeof playerChoice.key !== "string") return false
    if (typeof playerChoice.label !== "string") return false
    if (typeof playerChoice.damage !== "number") return false
    if (typeof playerChoice.resistance !== "number") return false
    if (typeof playerChoice.energy !== "number") return false
    if (typeof playerChoice.image !== "string") return false

    return true
  }, [playerChoice])

  const isValidChoices = useMemo<boolean>(() => {
    if (
      typeof choices !== "object" ||
      choices?.length === 0 ||
      choices === null
    ) {
      return false
    }

    return true
  }, [choices])

  const isValidEnemy = useMemo<boolean>(
    () => typeof enemy === "string",
    [enemy]
  )

  return (
    <div className="ChoiceSlot flex flex-col gap-10">
      {!isValidEnemy ? (
        <div data-test={isValidEnemy} className="error">
          Invalid enemy provided
        </div>
      ) : null}

      {!isValidChoices ? (
        <div className="error">Invalid choices provided</div>
      ) : (
        <div
          role="combobox"
          aria-label="choices combobox"
          aria-controls="listbox"
          aria-haspopup="listbox"
          aria-expanded="false"
          className={`grid w-fit bg-slate-400 ${defaultBorder}`}
          data-value={playerChoice.id}
          onClick={() => setIsOpen((prev) => !prev)}
          data-open={isOpen}
        >
          <div
            className={`col-span-3 w-fit bg-white shadow-sm shadow-slate-800 cursor-pointer ${defaultBorder}`}
          >
            {!isValidPlayerChoice ? (
              <div className="alert">Invalid player choice!</div>
            ) : (
              <div className={`${flexLayout}`}>
                <img
                  className="size-12"
                  src={Images[playerChoice.key]}
                  alt="attack icon image"
                  loading="lazy"
                />
                <div
                  data-enemy={enemy}
                  role="region"
                  aria-label="player choice"
                >
                  {playerChoice?.label}
                </div>
              </div>
            )}
          </div>
          {
            <div
              className={`grid-cols-[repeat(3,10rem)] mt-2 gap-1 ${
                isOpen ? "grid" : "hidden"
              }`}
            >
              {choices?.map((choice) => (
                <div
                  className={`cursor-pointer hover:bg-slate-200 ${defaultBorder} ${flexLayout} ${
                    choice.id === playerChoice.id
                      ? "border-amber-600 bg-amber-100"
                      : "border-slate-800 bg-slate-100"
                  }`}
                  key={choice.id}
                  data-choiceid={choice.id}
                  onClick={() => onUpdate(choice)}
                >
                  <img
                    className="size-12"
                    src={Images[choice.key]}
                    alt="attack icon image"
                  />
                  <div
                    role="option"
                    data-name={choice.key}
                    className="text-xs font-medium"
                  >
                    {choice.label}
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default ChoiceSlot
