"use client";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  HeadingIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingOption {
  level: HeadingLevel;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const HEADING_OPTIONS: HeadingOption[] = [
  { level: 1, label: "Heading 1", Icon: Heading1Icon },
  { level: 2, label: "Heading 2", Icon: Heading2Icon },
  { level: 3, label: "Heading 3", Icon: Heading3Icon },
  { level: 4, label: "Heading 4", Icon: Heading4Icon },
];

function useHeading() {
  const [activeLevel, setActiveLevel] = useState<HeadingLevel | null>(null);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setActiveLevel(null);
      return;
    }

    const updateState = () => {
      for (const option of HEADING_OPTIONS) {
        if (editor.isActive("heading", { level: option.level })) {
          setActiveLevel(option.level);
          return;
        }
      }

      setActiveLevel(null);
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  const setHeading = (level: HeadingLevel) => {
    if (!editor) return;

    editor.chain().focus().toggleHeading({ level }).run();
  };

  const isActive = (level: HeadingLevel) => activeLevel === level;

  return {
    activeLevel,
    setHeading,
    isActive,
  };
}

export function HeadingDropdownMenu() {
  const { activeLevel, setHeading, isActive } = useHeading();

  const ActiveIconComponent =
    HEADING_OPTIONS.find((option) => option.level === activeLevel)?.Icon ||
    HeadingIcon;

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon-sm"
              variant="ghost"
              className={cn(activeLevel && "text-primary bg-accent")}>
              <ActiveIconComponent />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Heading</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        {HEADING_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.level}
            onSelect={() => setHeading(option.level)}
            className={cn(isActive(option.level) && "bg-accent")}>
            <option.Icon
              className={cn(
                isActive(option.level)
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
            <span className="text-sm">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
