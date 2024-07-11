import { render, screen } from "@testing-library/react"
import React from "react"
import App from "./App.tsx"

describe("App tests", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })

  it("renders game page", () => {
    render(<App />)
    expect(screen.getByTestId("game-page")).toBeInTheDocument()
  })
})
