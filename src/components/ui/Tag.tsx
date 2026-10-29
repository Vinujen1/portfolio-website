import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted transition-colors",
        className,
      )}
    >
      {children}
    </li>
  );
}

export function TagList({ items, className, limit }: { items: string[]; className?: string; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {shown.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
      {rest > 0 ? <Tag className="border-dashed">{`+${rest}`}</Tag> : null}
    </ul>
  );
}
