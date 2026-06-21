import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  selectedCount: number;
  onClearAll: () => void;
  showOutput: boolean;
  onToggleOutput: () => void;
}

export function Header({
  selectedCount,
  onClearAll,
  showOutput,
  onToggleOutput,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[oklch(0.65_0.2_270)] to-[oklch(0.55_0.2_310)] flex items-center justify-center text-lg shadow-lg shadow-[oklch(0.55_0.2_270/0.3)]">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-linear-to-br from-[oklch(0.65_0.2_270)] to-[oklch(0.55_0.2_310)] rounded-xl blur opacity-30" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="bg-linear-to-r from-[oklch(0.8_0.15_270)] via-[oklch(0.85_0.12_300)] to-[oklch(0.8_0.15_330)] bg-clip-text text-transparent">
                  .gitignore
                </span>{" "}
                <span className="text-foreground/80">Generator</span>
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Select technologies to generate your .gitignore
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {selectedCount > 0 && (
              <div className="flex items-center gap-2 animate-fade-up" style={{ animationDuration: "0.3s" }}>
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-primary border-primary/20 px-3 py-1 font-mono text-sm tabular-nums"
                >
                  {selectedCount} selected
                </Badge>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearAll}
                      className="text-muted-foreground hover:text-destructive-foreground h-8 px-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear all selections</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={onToggleOutput}
                      className="bg-linear-to-r from-[oklch(0.55_0.2_270)] to-[oklch(0.5_0.2_300)] hover:from-[oklch(0.6_0.2_270)] hover:to-[oklch(0.55_0.2_300)] text-white shadow-lg shadow-[oklch(0.55_0.2_270/0.25)] h-8 gap-1.5"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Generate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {showOutput ? "Hide output" : "Show generated .gitignore"}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
