import { type GitignoreTemplate, type Category } from "@/data/gitignore-templates";
import { LanguageCard } from "./LanguageCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageGridProps {
  templates: GitignoreTemplate[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: (templates: GitignoreTemplate[]) => void;
  activeCategory: Category | "All";
}

export function LanguageGrid({
  templates,
  selected,
  onToggle,
  onSelectAll,
  activeCategory,
}: LanguageGridProps) {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No results found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search or category filter to find what you're
          looking for.
        </p>
      </div>
    );
  }

  // Group by category
  const grouped = templates.reduce(
    (acc, t) => {
      if (!acc[t.category]) acc[t.category] = [];
      acc[t.category]!.push(t);
      return acc;
    },
    {} as Record<string, GitignoreTemplate[]>
  );

  const categoryOrder: Category[] = [
    "Languages",
    "Frontend",
    "Backend",
    "Mobile",
    "DevOps",
    "Data Science",
    "Game Dev",
    "Other",
  ];

  const sortedGroups = categoryOrder
    .filter((cat) => grouped[cat])
    .map((cat) => ({ category: cat, items: grouped[cat]! }));

  return (
    <div className="space-y-10 animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
      {sortedGroups.map((group) => {
        const allSelected = group.items.every((t) => selected.has(t.id));

        return (
          <section key={group.category}>
            {/* Category header - only show when "All" */}
            {activeCategory === "All" && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    {group.category}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent min-w-[60px]" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectAll(group.items)}
                  className={cn(
                    "text-xs h-7 px-3",
                    allSelected
                      ? "text-primary hover:text-primary/80"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {allSelected ? "Deselect all" : "Select all"}
                </Button>
              </div>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {group.items.map((template, index) => (
                <LanguageCard
                  key={template.id}
                  template={template}
                  isSelected={selected.has(template.id)}
                  onToggle={() => onToggle(template.id)}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
