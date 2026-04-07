import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Tabs, { type TabItem } from "./Tabs";

type DemoTab = "stats" | "evolutions" | "moves";

const ITEMS: TabItem<DemoTab>[] = [
  { key: "stats", label: "STATS" },
  { key: "evolutions", label: "EVOLUTIONS" },
  { key: "moves", label: "MOVES" },
];

const meta = {
  title: "Shared/Tabs",
  component: Tabs<DemoTab>,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: ITEMS,
    activeKey: "stats",
    onChange: fn(),
    activeBackgroundColor: "#EF5350",
    buttonStyle: { minWidth: 150, height: 40 },
  },
} satisfies Meta<typeof Tabs<DemoTab>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState<DemoTab>("stats");
    return (
      <Tabs
        {...args}
        items={ITEMS}
        activeKey={active}
        onChange={setActive}
      />
    );
  },
};
