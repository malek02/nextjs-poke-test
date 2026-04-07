import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/background-image-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <SearchForm />
    </div>
  );
}
