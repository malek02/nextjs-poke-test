import Image from "next/image";
import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EF5350",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Back arrow */}
      <Link
        href="/"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          fontSize: 40,
          fontWeight: 300,
          textDecoration: "none",
          lineHeight: 1,
        }}
      >
        ‹
      </Link>

      {/* Title */}
      <h1
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "sans-serif",
          marginTop: 72,
          marginBottom: 0,
          textAlign: "center",
        }}
      >
        No Pokemon Found!
      </h1>

      {/* Psyduck image */}
      <div style={{ marginTop: 40 }}>
        <Image
          src="/not-found-image.png"
          alt="No Pokemon Found"
          width={280}
          height={280}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}
