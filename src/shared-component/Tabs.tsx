"use client";

import type { CSSProperties } from "react";
import Button from "./Button";

export interface TabItem<T extends string = string> {
  key: T;
  label: string;
}

interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;
  activeBackgroundColor: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  containerStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
}

export default function Tabs<T extends string>({
  items,
  activeKey,
  onChange,
  activeBackgroundColor,
  activeTextColor = "#fff",
  inactiveTextColor = activeBackgroundColor,
  containerStyle,
  buttonStyle,
}: TabsProps<T>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        marginBottom: 28,
        ...containerStyle,
      }}
    >
      {items.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <Button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            style={{
              background: isActive ? activeBackgroundColor : "transparent",
              color: isActive ? activeTextColor : inactiveTextColor,
              border: "none",
              borderRadius: 24,
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              fontFamily: "sans-serif",
              letterSpacing: 0.6,
              transition: "all 0.15s ease",
              ...buttonStyle,
            }}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
