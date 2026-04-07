import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./Input";

const meta = {
  title: "Shared/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search pokemon...",
    defaultValue: "",
    style: {
      width: 260,
      padding: "10px 12px",
      border: "1px solid #ddd",
      borderRadius: 6,
      fontSize: 14,
      color: "#333",
      background: "#fafafa",
      boxSizing: "border-box",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "pikachu",
  },
};
