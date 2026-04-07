import { Badge } from "@mantine/core";
import { typeColors } from "@/lib/type-colors";

interface TypeBadgeProps {
  typeName: string;
}

export default function TypeBadge({ typeName }: TypeBadgeProps) {
  const color = typeColors[typeName] ?? "#888";

  return (
    <Badge
      size="lg"
      radius="sm"
      style={{
        backgroundColor: color,
        color: "#fff",
        textTransform: "capitalize",
      }}
    >
      {typeName}
    </Badge>
  );
}
