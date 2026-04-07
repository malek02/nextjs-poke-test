import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { pokemonKeys } from "@/lib/query-keys";
import {
  getPokemon,
  getSpecies,
  PokemonNotFoundError,
} from "@/lib/services/pokemon-api";
import PokemonDetail from "@/components/PokemonDetail";

interface PageProps {
  params: Promise<{ nameOrId: string }>;
}

export default async function PokemonPage({ params }: PageProps) {
  const { nameOrId } = await params;
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: pokemonKeys.detail(nameOrId),
        queryFn: () => getPokemon(nameOrId),
      }),
      queryClient.prefetchQuery({
        queryKey: pokemonKeys.species(nameOrId),
        queryFn: () => getSpecies(nameOrId),
      }),
    ]);
  } catch (error) {
    if (error instanceof PokemonNotFoundError) {
      notFound();
    }
    throw error;
  }

  const pokemonState = queryClient.getQueryState(pokemonKeys.detail(nameOrId));
  if (pokemonState?.error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail nameOrId={nameOrId} />
    </HydrationBoundary>
  );
}
