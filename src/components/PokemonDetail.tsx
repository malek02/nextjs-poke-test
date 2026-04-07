"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { pokemonKeys } from "@/lib/query-keys";
import {
  getPokemon,
  getSpecies,
  getPokemonArtwork,
  getEnglishDescription,
} from "@/lib/services/pokemon-api";
import { typeColors } from "@/lib/type-colors";
import { PokemonDetailTab } from "@/lib/enum";
import StatsChart from "./StatsChart";
import EvolutionChainView from "./EvolutionChain";
import Button from "@/shared-component/Button";
import Tabs, { type TabItem } from "@/shared-component/Tabs";

type Tab = PokemonDetailTab;

interface PokemonDetailProps {
  nameOrId: string;
}

const TABS: TabItem<Tab>[] = [
  { key: PokemonDetailTab.Stats, label: "STATS" },
  { key: PokemonDetailTab.Evolutions, label: "EVOLUTIONS" },
  { key: PokemonDetailTab.Moves, label: "MOVES" },
];

export default function PokemonDetail({ nameOrId }: PokemonDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(PokemonDetailTab.Stats);

  const { data: pokemon } = useQuery({
    queryKey: pokemonKeys.detail(nameOrId),
    queryFn: () => getPokemon(nameOrId),
  });

  const { data: species } = useQuery({
    queryKey: pokemonKeys.species(nameOrId),
    queryFn: () => getSpecies(nameOrId),
  });

  if (!pokemon || !species) return null;

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const bgColor = typeColors[primaryType] ?? "#A8A878";
  const artwork = getPokemonArtwork(pokemon);
  const description = getEnglishDescription(species);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: bgColor,
      }}
    >
      {/* Top section — ~33% height, holds back button + sprite */}
      <div
        style={{
          flex: "0 0 24%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Back arrow */}
        <Button
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            top: 6,
            left: 60,
            background: "none",
            border: "none",
            color: "white",
            fontSize: 120,
            fontWeight: 300,
            cursor: "pointer",
            lineHeight: 1,
            padding: "0 4px",
          }}
        >
          ‹
        </Button>

        {/* Sprite — pulled down by half its height to straddle the card edge */}
        {artwork && (
          <Image
            src={artwork}
            alt={pokemon.name}
            width={170}
            height={170}
            unoptimized
            priority
            style={{
              objectFit: "contain",
              marginBottom: -85,
              zIndex: 5,
              position: "relative",
            }}
          />
        )}
      </div>

      {/* White card — flex: 1 fills the remaining ~67% */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          marginLeft: 40,
          marginRight: 40,
          paddingTop: 100,
          paddingLeft: 28,
          paddingRight: 28,
          paddingBottom: 32,
          overflowY: "auto",
          minHeight: 0,
        }}
        
      >
        {/* Pokemon name */}
        <h1
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 600,
            color: "#333",
            margin: "0 0 14px",
            textTransform: "capitalize",
            fontFamily: "sans-serif",
          }}
        >
          {pokemon.name}
        </h1>

        {/* Type badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              style={{
                background: typeColors[t.type.name] ?? "#888",
                color: "#fff",
                borderRadius: 24,
                padding: "6px 24px",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                letterSpacing: 0.8,
              }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#777",
            margin: "0 auto 28px",
            lineHeight: 1.7,
            fontFamily: "sans-serif",
            maxWidth: 480,
          }}
        >
          {description}
        </p>

        {/* Tab row */}
        <Tabs
          items={TABS}
          activeKey={activeTab}
          onChange={setActiveTab}
          activeBackgroundColor={bgColor}
          buttonStyle={{ minWidth: "206.37px", height: "40px" }}
        />

        {/* Tab content */}
        {activeTab === PokemonDetailTab.Stats && (
          <StatsChart stats={pokemon.stats} color={bgColor} />
        )}

        {activeTab === PokemonDetailTab.Evolutions && (
          <EvolutionChainView
            evolutionChainUrl={species.evolution_chain.url}
            arrowColor={bgColor}
          />
        )}

        {activeTab === PokemonDetailTab.Moves && (
          <p
            style={{
              textAlign: "center",
              color: "#bbb",
              marginTop: 40,
              fontFamily: "sans-serif",
              fontSize: 14,
            }}
          >
            Moves not available.
          </p>
        )}
      </div>
    </div>
  );
}
