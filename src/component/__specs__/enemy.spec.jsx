import { render, screen } from "@testing-library/react"
import React from "react"
import Enemy from "../Enemy"

describe("Enemy", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Enemy />)
    expect(baseElement).toBeTruthy()
  })

  it("renders different prop values", () => {})
  it("renders with optional props", () => {})
  it("throws error for invalid prop types", () => {})
  it("uses default prop values", () => {})

  it("renders the enemy sprite", () => {})
  it("renders empty player choice slot", () => {})
  
  it("has enemy attack pattern", () => {})
  it("can read player choice", () => {})
  it("make random enemy attack choice based on enemy attack pattern and player choice", () => {})
  it("display enemy choice", () => {})
  it("display net result per enemy for the turn", () => {})
  it("maintains all enemy choices for the given turn", () => {})
})
