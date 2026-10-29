import type { Diagram, DiagramNode } from "@/types/content";
import { cn } from "@/lib/cn";

const CELL_W = 212;
const CELL_H = 104;
const NODE_W = 176;
const NODE_H = 62;
const PAD = 18;

function box(node: DiagramNode) {
  const x = PAD + node.col * CELL_W;
  const y = PAD + node.row * CELL_H;
  return { x, y, cx: x + NODE_W / 2, cy: y + NODE_H / 2, right: x + NODE_W, bottom: y + NODE_H };
}

/** Orthogonal connector between two nodes, chosen by their relative grid position. */
function edgePath(a: DiagramNode, b: DiagramNode) {
  const s = box(a);
  const t = box(b);
  if (a.row === b.row) {
    return b.col > a.col ? `M${s.right},${s.cy} H${t.x}` : `M${s.x},${s.cy} H${t.right}`;
  }
  if (a.col === b.col) {
    return b.row > a.row ? `M${s.cx},${s.bottom} V${t.y}` : `M${s.cx},${s.y} V${t.bottom}`;
  }
  if (b.col > a.col) {
    const midX = s.right + (t.x - s.right) / 2;
    return `M${s.right},${s.cy} H${midX} V${t.cy} H${t.x}`;
  }
  // Target sits to the left: leave vertically, then run across into its right edge.
  const fromY = b.row > a.row ? s.bottom : s.y;
  return `M${s.cx},${fromY} V${t.cy} H${t.right}`;
}

const stateLabel = { done: "running", partial: "partial", planned: "planned" } as const;

type SystemDiagramProps = {
  diagram: Diagram;
  className?: string;
  /** Compact hides captions and legends for use inside project cards. */
  compact?: boolean;
};

export function SystemDiagram({ diagram, className, compact = false }: SystemDiagramProps) {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const width = PAD * 2 + (diagram.cols - 1) * CELL_W + NODE_W;
  const height = PAD * 2 + (diagram.rows - 1) * CELL_H + NODE_H;

  const svg = (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      aria-hidden
      focusable="false"
      fontFamily="var(--font-plex-mono), ui-monospace, monospace"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--line-strong)" />
        </marker>
      </defs>

      {diagram.edges.map((edge) => {
        const a = byId.get(edge.from);
        const b = byId.get(edge.to);
        if (!a || !b) return null;
        const d = edgePath(a, b);
        const live = a.state !== "planned" && b.state !== "planned";
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path
              d={d}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth={1.25}
              strokeDasharray={live ? undefined : "4 5"}
              markerEnd="url(#arrow)"
            />
            {live ? (
              <path d={d} fill="none" stroke="var(--accent)" strokeWidth={1.75} strokeLinecap="round" className="signal-dash" />
            ) : null}
          </g>
        );
      })}

      {diagram.nodes.map((node) => {
        const { x, y } = box(node);
        const planned = node.state === "planned";
        return (
          <g key={node.id}>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx={10}
              fill={planned ? "var(--bg)" : "var(--surface-2)"}
              stroke={planned ? "var(--line-strong)" : node.state === "partial" ? "var(--warn)" : "var(--line-strong)"}
              strokeDasharray={planned ? "4 4" : undefined}
            />
            <circle
              cx={x + 14}
              cy={y + 18}
              r={3}
              fill={node.state === "done" ? "var(--ok)" : node.state === "partial" ? "var(--warn)" : "none"}
              stroke={planned ? "var(--muted)" : "none"}
            />
            <text
              x={x + 24}
              y={compact ? y + 23 : y + 22}
              fontSize={compact ? 14 : 13}
              fontWeight={500}
              fill={planned ? "var(--muted)" : "var(--text)"}
            >
              {node.label}
            </text>
            {/* Cards are too small for the detail line to be legible, so only the case study shows it. */}
            {node.detail && !compact ? (
              <text x={x + 14} y={y + 45} fontSize={11} fill="var(--muted)">
                {node.detail}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );

  if (compact) {
    return <div className={className}>{svg}</div>;
  }

  return (
    <figure className={cn("rounded-2xl border border-line bg-surface", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{diagram.title}</p>
        <ul className="flex flex-wrap gap-4 font-mono text-[0.6875rem] text-muted" aria-label="Legend">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-full bg-ok" /> Running
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-full bg-warn" /> Partial
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-full border border-dashed border-muted" /> Planned
          </li>
        </ul>
      </div>
      {/* Wide pipelines stay legible on phones by scrolling inside the figure rather than shrinking. */}
      <div className="overflow-x-auto p-4 md:p-6" tabIndex={0} aria-label={`${diagram.title}, scrollable`}>
        <div className="min-w-[600px]">{svg}</div>
      </div>
      <ol className="sr-only">
        {diagram.nodes.map((node) => (
          <li key={node.id}>
            {node.label}
            {node.detail ? `: ${node.detail}` : ""} ({stateLabel[node.state ?? "done"]})
          </li>
        ))}
      </ol>
      <figcaption className="border-t border-line px-5 py-3.5 text-sm text-muted">{diagram.caption}</figcaption>
    </figure>
  );
}
