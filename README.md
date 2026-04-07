# Pokédex App

A Next.js 16 web application that lets you search any Pokémon by name or ID and view its stats, evolution chain, and moves — powered by the public [PokéAPI](https://pokeapi.co).

---

## Features

- **Search** — look up any Pokémon by name or ID number
- **Detail view** — official artwork, type badges, and Pokédex description
- **Stats tab** — bar chart of base stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) via Recharts
- **Evolutions tab** — full evolution chain with sprites and level requirements
- **Moves tab** — scrollable list of all learnable moves with level learned
- **Type-themed UI** — background color adapts to the Pokémon's primary type
- **Storybook** — isolated component stories for `Button`, `Input`, and `Tabs`
- **Unit tests** — Vitest + Testing Library for shared components

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + inline styles |
| UI components | [Mantine 9](https://mantine.dev) |
| Data fetching | [TanStack Query 5](https://tanstack.com/query) |
| Charts | [Recharts 3](https://recharts.org) |
| Testing | [Vitest 4](https://vitest.dev) + Testing Library |
| Storybook | Storybook 10 (Vite-based, Next.js plugin) |
| Containerisation | Docker (multi-stage, Node 20 Alpine) |

---

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   └── page.tsx           # Home page (SearchForm)
├── components/            # Feature components
│   ├── PokemonDetail.tsx  # Full detail view with tabs
│   ├── EvolutionChain.tsx # Evolution chain renderer
│   ├── SearchForm.tsx     # Search input + result card
│   ├── StatsChart.tsx     # Recharts base-stat bar chart
│   └── TypeBadge.tsx      # Coloured type pill
├── shared-component/      # Generic reusable components (with stories & tests)
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Tabs.tsx
├── lib/
│   ├── services/
│   │   └── pokemon-api.ts # PokéAPI fetch helpers + data transformers
│   ├── model/             # TypeScript interfaces (Pokemon, Species, Evolution)
│   ├── enum/              # Enums (PokemonDetailTab)
│   ├── query-keys.ts      # TanStack Query key factories
│   └── type-colors.ts     # Type-name → hex colour map
└── providers/             # React context providers (QueryClient, etc.)
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test` | Run all tests (unit + storybook) |
| `npm run test:unit` | Unit tests only |
| `npm run test:storybook` | Storybook interaction tests |
| `npm run storybook` | Launch Storybook on port 6006 |
| `npm run build-storybook` | Static Storybook build |

---

## Docker

Build and run the production image:

```bash
docker build -t pokedex-app .
docker run -p 3000:3000 pokedex-app
```

The multi-stage Dockerfile uses Node 20 Alpine and outputs a standalone Next.js bundle.

---

## API

All data is fetched from the public, free [PokéAPI v2](https://pokeapi.co/api/v2). No API key is required. The base URL is `https://pokeapi.co/api/v2`.

Key endpoints used:

| Endpoint | Purpose |
|---|---|
| `GET /pokemon/{nameOrId}` | Base stats, types, sprites, moves |
| `GET /pokemon-species/{nameOrId}` | Pokédex description, evolution chain URL |
| `GET /evolution-chain/{id}` | Full evolution tree |

---

## Testing

```bash
# All tests
npm run test

# Unit tests only (jsdom environment)
npm run test:unit

# Storybook component tests (Playwright browser)
npm run test:storybook
```

Tests live in `src/shared-component/*.test.tsx` and `src/test/`.
