"use client";
import { useEffect, useState } from "react";
import { ListIcon, ListOrderedIcon } from "lucide-react";

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

type ListType = "bulletList" | "orderedList";

interface ListOption {
  type: ListType;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const LIST_OPTIONS: ListOption[] = [
  { type: "bulletList", label: "Bullet List", Icon: ListIcon },
  { type: "orderedList", label: "Numbered List", Icon: ListOrderedIcon },
];

function useList() {
  const [activeType, setActiveType] = useState<ListType | null>(null);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setActiveType(null);
      return;
    }

    const updateState = () => {
      for (const option of LIST_OPTIONS) {
        if (editor.isActive(option.type)) {
          setActiveType(option.type);
          return;
        }
      }

      setActiveType(null);
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  const toggleList = (type: ListType) => {
    if (!editor) return;
    editor.chain().focus().toggleList(type, "listItem").run();
  };

  const isActive = (type: ListType) => activeType === type;

  return {
    activeType,
    toggleList,
    isActive,
  };
}

export function ListDropdownMenu() {
  const { activeType, toggleList, isActive } = useList();

  const ActiveIconComponent =
    LIST_OPTIONS.find((option) => option.type === activeType)?.Icon || ListIcon;

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon-sm"
              variant="ghost"
              className={cn(activeType && "text-primary bg-accent")}>
              <ActiveIconComponent />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>List</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        {LIST_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.type}
            onSelect={() => toggleList(option.type)}
            className={cn(isActive(option.type) && "bg-accent")}>
            <option.Icon
              className={cn(
                isActive(option.type)
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
