import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import ChoiceSlot from "../ChoiceSlot"
import choices from "../../data/choices"

const enemyId = "en_R0T46xlWo0Q13G3E0dWyz"
const exampleChoice = {
  id: "ch_aRV0pLNLlgLzWn6mBCoV8",
  key: "rock-l",
  label: "Light Rock",
  damage: 10,
  resistance: 10,
  energy: -10,
  image: "/images/rock-l.png",
}

const anotherChoice = {
  id: "ch_dUY3sOQOnJOzAq9pEFrY1",
  key: "paper-l",
  label: "Light Paper",
  damage: 10,
  resistance: 10,
  energy: -10,
  image: "/images/paper-l.png",
}

describe("ChoiceSlot", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ChoiceSlot />)
    expect(baseElement).toBeTruthy()
  })

  it("renders different prop values", () => {
    const { rerender, getByLabelText } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
      />
    )
    expect(getByLabelText("player choice")).toHaveTextContent(exampleChoice.label)

    rerender(
      <ChoiceSlot
        choices={choices}
        playerChoice={anotherChoice}
        enemy={enemyId}
      />
    )
    expect(getByLabelText("player choice")).toHaveTextContent(
      anotherChoice.label
    )
  })

  it("throws error for invalid prop types", () => {
    const { rerender } = render(
      <ChoiceSlot choices={choices} playerChoice={"rock-l"} enemy={enemyId} />
    )
    expect(screen.getByText("Invalid player choice!")).toBeInTheDocument()

    rerender(
      <ChoiceSlot choices={""} playerChoice={exampleChoice} enemy={enemyId} />
    )
    expect(screen.getByText("Invalid choices provided")).toBeInTheDocument()

    rerender(
      <ChoiceSlot choices={choices} playerChoice={exampleChoice} enemy={null} />
    )
    expect(screen.getByText("Invalid enemy provided")).toBeInTheDocument()
  })

  it("always attached to an enemy", async () => {
    const { getByLabelText } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
      />
    )

    const element = getByLabelText("player choice")
    expect(element).toHaveAttribute("data-enemy")
    expect(element.getAttribute("data-enemy")).toBe(enemyId)
  })

  it("displays list of choices to choose from", async () => {
    const user = userEvent.setup()
    const { getAllByRole, getByRole } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
      />
    )

    const combobox = getByRole("combobox")
    await user.click(combobox)

    const options = getAllByRole("option")
    expect(options).toHaveLength(9)
  })

  it("displays all variations of rock choices in the list", async () => {
    const user = userEvent.setup()
    const { getAllByRole, getByRole } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
      />
    )

    const combobox = getByRole("combobox")
    await user.click(combobox)

    const options = getAllByRole("option")
    const rockItems = options.filter((item) =>
      item.getAttribute("data-name").includes("rock")
    )
    expect(rockItems).toHaveLength(3)
  })

  it("displays all variations of paper choices in the list", async () => {
    const user = userEvent.setup()
    const { getAllByRole, getByRole } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
      />
    )

    const combobox = getByRole("combobox")
    await user.click(combobox)

    const options = getAllByRole("option")
    const rockItems = options.filter((item) =>
      item.getAttribute("data-name").includes("paper")
    )

    expect(rockItems).toHaveLength(3)
  })

  it("displays all variations of scissor choices in the list", async () => {
    const user = userEvent.setup()
    const { getAllByRole, getByRole } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
      />
    )

    const combobox = getByRole("combobox")
    await user.click(combobox)

    const options = getAllByRole("option")
    const rockItems = options.filter((item) =>
      item.getAttribute("data-name").includes("scissor")
    )

    expect(rockItems).toHaveLength(3)
  })

  it("displays the default player choice as selected value in the list", async () => {
    const { getByRole } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={anotherChoice}
        enemy={enemyId}
      />
    )

    expect(getByRole("combobox").getAttribute("data-value")).toBe(
      anotherChoice.id
    )
  })

  it("displays updated player choice from the list", async () => {
    const updateHandler = jest.fn()
    const user = userEvent.setup()
    const { getByRole } = render(
      <ChoiceSlot
        choices={choices}
        playerChoice={exampleChoice}
        enemy={enemyId}
        onUpdate={updateHandler}
      />
    )

    const combobox = await getByRole("combobox")
    await user.click(combobox)

    // Find the desired option element by its label - <option>{name}</option>
    const option = screen.getByRole("option", { name: anotherChoice.label })

    // Click on the option to select it
    await user.click(option)

    await waitFor(() => {
      expect(updateHandler).toHaveBeenCalledTimes(1)
      expect(updateHandler).toHaveBeenCalledWith(
        expect.objectContaining(anotherChoice)
      )
    })
  })
})
