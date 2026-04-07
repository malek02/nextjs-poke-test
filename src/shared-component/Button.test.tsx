import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("shared Button", () => {
  it("renders provided children", () => {
    render(<Button type="button">Search</Button>);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="button" onClick={onClick}>
        Random
      </Button>
    );

    await user.click(screen.getByRole("button", { name: "Random" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
