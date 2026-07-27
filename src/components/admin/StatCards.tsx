import type { LeadStats } from "@/lib/admin/leads";

interface StatCardsProps {
  stats: LeadStats;
}

const CARDS: Array<{ key: keyof LeadStats; label: string; accent?: boolean }> = [
  { key: "today", label: "Bugün", accent: true },
  { key: "last7Days", label: "Son 7 gün" },
  { key: "last30Days", label: "Son 30 gün" },
  { key: "total", label: "Toplam" },
];

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="adm-stats">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className={`adm-stat${card.accent ? " is-accent" : ""}`}
        >
          <div className="adm-stat-label">{card.label}</div>
          <div className="adm-stat-value">{stats[card.key]}</div>
        </div>
      ))}
    </div>
  );
}
