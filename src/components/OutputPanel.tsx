import { useState, useRef, useCallback } from "react";
import { type GitignoreTemplate } from "@/data/gitignore-templates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
  content: string;
  selectedTemplates: GitignoreTemplate[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export function OutputPanel({
  content,
  selectedTemplates,
  isOpen,
  onClose,
  onRemove,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".gitignore";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content]);

  if (!isOpen || selectedTemplates.length === 0) return null;

  const lineCount = content.split("\n").length;
  const ruleCount = content
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#")).length;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out",
        expanded ? "top-0" : "h-auto max-h-[70vh]"
      )}
    >
      {/* Backdrop */}
      {expanded && (
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
      )}

      <div
        className={cn(
          "relative mx-auto glass-card border-t border-x rounded-t-2xl overflow-hidden flex flex-col",
          expanded
            ? "h-full max-w-5xl mt-8 rounded-2xl border"
            : "max-w-6xl max-h-[70vh]"
        )}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-card/30 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            {/* macOS-style dots */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
                title="Close"
              />
              <button
                onClick={() => setExpanded(false)}
                className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors"
                title="Minimize"
              />
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors"
                title="Expand"
              />
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-muted-foreground">
                .gitignore
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-mono px-1.5 py-0 h-5 border-border/50"
              >
                {lineCount} lines
              </Badge>
              <Badge
                variant="outline"
                className="text-[10px] font-mono px-1.5 py-0 h-5 border-border/50"
              >
                {ruleCount} rules
              </Badge>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className={cn(
                    "h-8 px-3 gap-1.5 text-xs copy-btn",
                    copied
                      ? "text-green-400"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy to clipboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="h-8 px-3 gap-1.5 text-xs text-muted-foreground hover:text-foreground copy-btn"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download .gitignore file</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground copy-btn"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {expanded ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    )}
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {expanded ? "Minimize" : "Expand"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Selected tags */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border/30 bg-card/20 overflow-x-auto shrink-0">
          <span className="text-xs text-muted-foreground shrink-0">
            Includes:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {selectedTemplates.map((t) => (
              <Badge
                key={t.id}
                variant="secondary"
                className="group/badge h-6 pl-2 pr-1 gap-1 text-xs bg-card/60 border border-border/40 hover:border-primary/30 transition-colors cursor-default"
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
                <button
                  onClick={() => onRemove(t.id)}
                  className="ml-0.5 w-4 h-4 rounded-sm flex items-center justify-center text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/20 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Code content */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="code-preview p-5">
            <pre
              ref={preRef}
              className="text-[13px] leading-relaxed whitespace-pre"
            >
              {content.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="inline-block w-10 text-right pr-4 text-muted-foreground/30 select-none shrink-0 tabular-nums text-[12px]">
                    {i + 1}
                  </span>
                  <span
                    className={
                      line.startsWith("# ===") || line.startsWith("# ╔") || line.startsWith("# ╚") || line.startsWith("# ║")
                        ? "section-header"
                        : line.startsWith("#")
                          ? "comment"
                          : "text-foreground/90"
                    }
                  >
                    {line || " "}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
