"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared-component/Button";
import Input from "@/shared-component/Input";

const MAX_POKEMON_ID = 1025;



export default function SearchForm() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/pokemon/${trimmed.toLowerCase()}`);
  }

  function handleRandom() {
    const id = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    router.push(`/pokemon/${id}`);
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        padding: "36px 32px 32px",
        width: "100%",
        maxWidth: 340,
        border: "2px solid #595854",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      
      <div style={{ marginBottom: 20,width: "94.22px", height: "92.98px", backgroundImage: "url('/pok-ball.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}>

     
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div style={{ marginBottom: 6 }}>
          <label
            style={{
              fontSize: 13,
              color: "#555",
              fontFamily: "sans-serif",
              display: "block",
              marginBottom: 6,
            }}
          >
            Pokemon Name or Id
          </label>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: 6,
              fontSize: 14,
              outline: "none",
              color: "#333",
              background: "#fafafa",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <Button
            type="submit"
            style={{
              flex: 1,
              padding: "10px 0",
              background: "#EF5350",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "sans-serif",
            }}
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={handleRandom}
            style={{
              flex: 1,
              padding: "10px 0",
              background: "#EF5350",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "sans-serif",
            }}
          >
            Random
          </Button>
        </div>
      </form>
    </div>
  );
}
