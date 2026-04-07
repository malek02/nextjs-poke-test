"use client";

import { useQuery } from "@tanstack/react-query";
import { Group, Stack, Text, Loader, Center } from "@mantine/core";
import Image from "next/image";
import { pokemonKeys } from "@/lib/query-keys";
import { getEvolutionChain, flattenEvolutionChain } from "@/lib/services/pokemon-api";
import type { EvolutionStage } from "@/lib/model";
import { useRouter } from "next/navigation";

interface EvolutionChainProps {
  evolutionChainUrl: string;
  arrowColor: string;
}

function Arrow({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M0 12H36M36 12L26 2M36 12L26 22"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StageCard({
  stage,
  onClick,
}: {
  stage: EvolutionStage;
  onClick: () => void;
}) {
  return (
    <Stack
      align="center"
      gap={4}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={stage.spriteUrl}
        alt={stage.name}
        width={96}
        height={96}
        unoptimized
      />
      <Text
        size="sm"
        fw={600}
        style={{ textTransform: "capitalize" }}
      >
        {stage.name}
      </Text>
      {stage.minLevel && (
        <Text size="xs" c="dimmed">
          Lv. {stage.minLevel}
        </Text>
      )}
    </Stack>
  );
}

export default function EvolutionChainView({
  evolutionChainUrl,
  arrowColor,
}: EvolutionChainProps) {
  const chainId = Number(
    evolutionChainUrl.replace(/\/$/, "").split("/").pop()
  );
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: pokemonKeys.evolutionChain(chainId),
    queryFn: () => getEvolutionChain(evolutionChainUrl),
  });

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (!data) return null;

  const stages = flattenEvolutionChain(data.chain);

  if (stages.length <= 1) {
    return (
      <Center py="xl">
        <Text c="dimmed">This Pokemon does not evolve.</Text>
      </Center>
    );
  }

  return (
    <Group justify="center" align="center" gap="lg" wrap="wrap" py="xl">
      {stages.map((stage, i) => (
        <Group key={stage.id} align="center" gap="md" wrap="nowrap">
          {i > 0 && <Arrow color={arrowColor} />}
          <StageCard
            stage={stage}
            onClick={() => router.push(`/pokemon/${stage.name}`)}
          />
        </Group>
      ))}
    </Group>
  );
}
