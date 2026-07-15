import type { OttOption } from "@/lib/demo-data";

/** Brand initials shown on the tile — trimmed to 1–2 chars for legibility. */
const INITIALS: Record<string, string> = {
  netflix: "N",
  prime: "pv",
  hotstar: "JH",
  zee5: "Z5",
  sonyliv: "SL",
  appletv: "tv",
  chatgpt: "AI",
  linkedin: "in",
  spotify: "S",
  youtube: "YT",
};

function readable(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq > 160 ? "#0b0b0b" : "#ffffff";
}

/** Self-contained brand tile — no network fetch, always renders. */
export function OttLogo({
  option,
  size = 20,
  rounded = 6,
}: {
  option: OttOption;
  size?: number;
  rounded?: number;
}) {
  const label = INITIALS[option.id] ?? option.name.slice(0, 2);
  const fg = readable(option.color);
  const fontSize = label.length > 1 ? size * 0.5 : size * 0.62;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={`${option.name} logo`}
      style={{ display: "block" }}
    >
      <rect width="40" height="40" rx={rounded} ry={rounded} fill={option.color} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill={fg}
        fontFamily="'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight={800}
        fontSize={fontSize * (40 / size)}
        letterSpacing="-0.02em"
      >
        {label}
      </text>
    </svg>
  );
}