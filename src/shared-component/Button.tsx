"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

interface SharedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Button({ children, style, ...props }: SharedButtonProps) {
  return (
    <button {...props} style={style}>
      {children}
    </button>
  );
}
