import { type Category } from "@/data/gitignore-templates";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { name: Category; icon: string; description: string }[];
  activeCategory: Category | "All";
  onCategoryChange: (category: Category | "All") => void;
  templateCounts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  templateCounts,
}: CategoryFilterProps) {
  const allItems = [
    { name: "All" as const, icon: "✨", description: "All technologies" },
    ...categories,
  ];

  return (
    <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
      <div className="flex flex-wrap justify-center gap-2">
        {allItems.map((cat) => {
          const isActive = activeCategory === cat.name;
          const count = templateCounts[cat.name] ?? 0;

          return (
            <button
              key={cat.name}
              id={`category-${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onCategoryChange(cat.name)}
              className={cn(
                "group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                  : "bg-card/40 text-muted-foreground border border-transparent hover:bg-card/70 hover:text-foreground hover:border-border/50"
              )}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={cn(
                  "text-[11px] tabular-nums font-mono px-1.5 py-0.5 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                )}
              >
                {count}
              </span>
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-primary/5 animate-pulse" style={{ animationDuration: "3s" }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
