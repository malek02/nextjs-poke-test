import type { PokemonStat } from "@/lib/model";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

const MAX_STAT = 255;

interface StatsChartProps {
  stats: PokemonStat[];
  color: string;
}

export default function StatsChart({ stats, color }: StatsChartProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        paddingLeft: 8,
        paddingRight: 8,
        maxWidth: 380,
        margin: "0 auto",
      }}
    >
      {stats.map((s) => {
        const label = STAT_LABELS[s.stat.name] ?? s.stat.name.toUpperCase();
        const pct = Math.min(100, Math.round((s.base_stat / MAX_STAT) * 100));

        return (
          <div
            key={s.stat.name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {/* Stat label */}
            <span
              style={{
                width: 36,
                textAlign: "right",
                fontSize: 10,
                fontWeight: 700,
                color: color,
                fontFamily: "sans-serif",
                flexShrink: 0,
                letterSpacing: 0.5,
              }}
            >
              {label}
            </span>

            {/* Stat value */}
            <span
              style={{
                width: 30,
                textAlign: "right",
                fontSize: 10,
                color: "#444",
                fontFamily: "monospace",
                flexShrink: 0,
              }}
            >
              {String(s.base_stat).padStart(3, "0")}
            </span>

            {/* Progress bar track */}
            <div
              style={{
                flex: 1,
                height: 8,
                background: "#f0f0f0",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Filled portion */}
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: color,
                  borderRadius: 8,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
