export interface EvolutionDetail {
  min_level: number | null;
  trigger: { name: string };
}

export interface ChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChainResponse {
  id: number;
  chain: ChainLink;
}

export interface EvolutionStage {
  name: string;
  id: number;
  spriteUrl: string;
  minLevel: number | null;
}
