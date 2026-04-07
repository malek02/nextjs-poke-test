export const pokemonKeys = {
  all: ["pokemon"] as const,
  detail: (nameOrId: string) => ["pokemon", "detail", nameOrId] as const,
  species: (nameOrId: string) => ["pokemon", "species", nameOrId] as const,
  evolutionChain: (id: number) => ["pokemon", "evolution", id] as const,
};
