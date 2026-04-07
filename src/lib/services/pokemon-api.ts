import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChainResponse,
  EvolutionStage,
  ChainLink,
} from "../model";

const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonNotFoundError extends Error {
  constructor(nameOrId: string) {
    super(`Pokemon "${nameOrId}" not found`);
    this.name = "PokemonNotFoundError";
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (res.status === 404) {
    throw new PokemonNotFoundError(url);
  }
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function getPokemon(nameOrId: string): Promise<Pokemon> {
  return fetchJson<Pokemon>(`${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
}

export async function getSpecies(nameOrId: string): Promise<PokemonSpecies> {
  return fetchJson<PokemonSpecies>(
    `${BASE_URL}/pokemon-species/${nameOrId.toLowerCase()}`
  );
}

export async function getEvolutionChain(
  url: string
): Promise<EvolutionChainResponse> {
  return fetchJson<EvolutionChainResponse>(url);
}

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return Number(parts[parts.length - 1]);
}

export function flattenEvolutionChain(chain: ChainLink): EvolutionStage[] {
  const stages: EvolutionStage[] = [];

  function walk(link: ChainLink) {
    const id = extractIdFromUrl(link.species.url);
    stages.push({
      name: link.species.name,
      id,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      minLevel: link.evolution_details[0]?.min_level ?? null,
    });
    for (const next of link.evolves_to) {
      walk(next);
    }
  }

  walk(chain);
  return stages;
}

export function getEnglishDescription(species: PokemonSpecies): string {
  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === "en"
  );
  return entry
    ? entry.flavor_text.replace(/[\n\f\r]/g, " ")
    : "No description available.";
}

export function getEnglishGenus(species: PokemonSpecies): string {
  const genus = species.genera.find((g) => g.language.name === "en");
  return genus?.genus ?? "";
}

export function getPokemonArtwork(pokemon: Pokemon): string {
  return (
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.other?.dream_world?.front_default ??
    pokemon.sprites.front_default ??
    ""
  );
}
