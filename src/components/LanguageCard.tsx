import { type GitignoreTemplate } from "@/data/gitignore-templates";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface LanguageCardProps {
  template: GitignoreTemplate;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

export function LanguageCard({
  template,
  isSelected,
  onToggle,
  index,
}: LanguageCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          id={`lang-${template.id}`}
          onClick={onToggle}
          className={cn(
            "category-card group relative flex flex-col items-center gap-2.5 p-4 rounded-xl border text-center cursor-pointer select-none",
            "transition-all duration-300",
            isSelected
              ? "glass-card border-primary/40 shadow-lg shadow-primary/10"
              : "bg-card/30 border-border/40 hover:bg-card/60 hover:border-border/70"
          )}
          style={{
            animationDelay: `${index * 30}ms`,
          }}
        >
          {/* Checkbox indicator */}
          <div className="absolute top-2.5 right-2.5">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggle()}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "h-4 w-4 rounded transition-all",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 opacity-0 group-hover:opacity-100"
              )}
            />
          </div>

          {/* Glow effect when selected */}
          {isSelected && (
            <div
              className="absolute inset-0 rounded-xl opacity-20"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${template.color}40, transparent 70%)`,
              }}
            />
          )}

          {/* Icon */}
          <div
            className={cn(
              "relative text-2xl w-12 h-12 flex items-center justify-center rounded-lg transition-transform duration-300",
              isSelected ? "scale-110" : "group-hover:scale-105"
            )}
            style={{
              background: isSelected
                ? `linear-gradient(135deg, ${template.color}15, ${template.color}08)`
                : undefined,
            }}
          >
            {template.icon}
            {isSelected && (
              <div
                className="absolute inset-0 rounded-lg animate-pulse"
                style={{
                  boxShadow: `0 0 20px ${template.color}30`,
                  animationDuration: "2s",
                }}
              />
            )}
          </div>

          {/* Name */}
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              isSelected ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
            )}
          >
            {template.name}
          </span>

          {/* Bottom accent line */}
          <div
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-500",
              isSelected ? "w-8 opacity-100" : "w-0 opacity-0"
            )}
            style={{
              background: `linear-gradient(90deg, transparent, ${template.color}, transparent)`,
            }}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="bg-card border-border"
      >
        <p className="font-medium">{template.name}</p>
        <p className="text-xs text-muted-foreground">{template.description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {template.patterns.filter((p) => p && !p.startsWith("#")).length} rules
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
