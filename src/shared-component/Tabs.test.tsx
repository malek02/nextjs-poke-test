import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Tabs, { type TabItem } from "./Tabs";

type TestTab = "stats" | "moves";

const ITEMS: TabItem<TestTab>[] = [
  { key: "stats", label: "STATS" },
  { key: "moves", label: "MOVES" },
];

describe("shared Tabs", () => {
  it("renders all tab labels", () => {
    render(
      <Tabs
        items={ITEMS}
        activeKey="stats"
        onChange={() => {}}
        activeBackgroundColor="#EF5350"
      />
    );

    expect(screen.getByRole("button", { name: "STATS" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "MOVES" })).toBeInTheDocument();
  });

  it("calls onChange with clicked tab key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs
        items={ITEMS}
        activeKey="stats"
        onChange={onChange}
        activeBackgroundColor="#EF5350"
      />
    );

    await user.click(screen.getByRole("button", { name: "MOVES" }));
    expect(onChange).toHaveBeenCalledWith("moves");
  });
});
