import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Shared/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Click me",
    onClick: fn(),
    type: "button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    style: {
      background: "#EF5350",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "10px 18px",
      fontWeight: 600,
      cursor: "pointer",
    },
  },
};

export const Ghost: Story = {
  args: {
    style: {
      background: "transparent",
      color: "#EF5350",
      border: "1px solid #EF5350",
      borderRadius: 6,
      padding: "10px 18px",
      cursor: "pointer",
    },
  },
};
