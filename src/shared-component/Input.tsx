"use client";

import type { CSSProperties, InputHTMLAttributes } from "react";

interface SharedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
}

export default function Input({ style, ...props }: SharedInputProps) {
  return <input {...props} style={style} />;
}
