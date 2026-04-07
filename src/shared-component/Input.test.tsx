import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Input from "./Input";

describe("shared Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Pokemon Name or Id" />);
    expect(screen.getByPlaceholderText("Pokemon Name or Id")).toBeInTheDocument();
  });

  it("accepts typed values", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="pokemon-input" />);
    const input = screen.getByLabelText("pokemon-input");

    await user.type(input, "charizard");
    expect(input).toHaveValue("charizard");
  });
});
