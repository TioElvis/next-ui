"use client";
import { useEffect, useState } from "react";
import { BanIcon, HighlighterIcon } from "lucide-react";

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

interface HighlightColor {
  name: string;
  value: string;
  preview: string;
}

const HIGHLIGHT_COLORS: HighlightColor[] = [
  {
    name: "Yellow",
    value: "rgba(253, 224, 71, 0.4)",
    preview: "bg-yellow-300/40",
  },
  {
    name: "Green",
    value: "rgba(134, 239, 172, 0.4)",
    preview: "bg-green-300/40",
  },
  {
    name: "Blue",
    value: "rgba(147, 197, 253, 0.4)",
    preview: "bg-blue-300/40",
  },
  {
    name: "Pink",
    value: "rgba(249, 168, 212, 0.4)",
    preview: "bg-pink-300/40",
  },
  {
    name: "Purple",
    value: "rgba(216, 180, 254, 0.4)",
    preview: "bg-purple-300/40",
  },
  {
    name: "Orange",
    value: "rgba(253, 186, 116, 0.4)",
    preview: "bg-orange-300/40",
  },
];

function useHighlight() {
  const [isActive, setIsActive] = useState(false);
  const [currentColor, setCurrentColor] = useState<string | null>(null);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setIsActive(false);
      setCurrentColor(null);
      return;
    }

    const updateState = () => {
      const active = editor.isActive("highlight");
      setIsActive(active);

      if (active) {
        const { color } = editor.getAttributes("highlight");
        setCurrentColor(color || null);
      } else {
        setCurrentColor(null);
      }
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  const setHighlight = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setHighlight({ color }).run();
  };

  const removeHighlight = () => {
    if (!editor) return;
    editor.chain().focus().unsetHighlight().run();
  };

  return {
    isActive,
    currentColor,
    setHighlight,
    removeHighlight,
  };
}

export function HighlightDropdownMenu() {
  const { isActive, currentColor, setHighlight, removeHighlight } =
    useHighlight();

  const activeColor = HIGHLIGHT_COLORS.find((c) => c.value === currentColor);

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <HighlighterIcon className={cn(isActive && "text-primary")} />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Highlight</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="flex">
        {HIGHLIGHT_COLORS.map((color) => {
          return (
            <Tooltip key={color.name}>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  onSelect={() => setHighlight(color.value)}
                  className={cn(
                    activeColor?.value === color.value && "bg-accent",
                  )}>
                  <span className={cn("h-4 w-4 rounded-full", color.preview)} />
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>{color.name}</TooltipContent>
            </Tooltip>
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem onClick={() => removeHighlight()}>
              <BanIcon />
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent>Remove</TooltipContent>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
