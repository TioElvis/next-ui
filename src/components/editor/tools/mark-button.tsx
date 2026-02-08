"use client";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  UnderlineIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";

type MarkType = "bold" | "italic" | "strike" | "code" | "underline";

interface MarkConfig {
  type: MarkType;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  command: string;
}

const MARK_CONFIGS: Record<MarkType, MarkConfig> = {
  bold: { type: "bold", label: "Bold", Icon: BoldIcon, command: "toggleBold" },
  italic: {
    type: "italic",
    label: "Italic",
    Icon: ItalicIcon,
    command: "toggleItalic",
  },
  strike: {
    type: "strike",
    label: "Strikethrough",
    Icon: StrikethroughIcon,
    command: "toggleStrike",
  },
  code: { type: "code", label: "Code", Icon: CodeIcon, command: "toggleCode" },
  underline: {
    type: "underline",
    label: "Underline",
    Icon: UnderlineIcon,
    command: "toggleUnderline",
  },
};

function useMark(type: MarkType) {
  const [isActive, setIsActive] = useState(false);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setIsActive(false);
      return;
    }

    const updateState = () => {
      setIsActive(editor.isActive(type));
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor, type]);

  const toggleMark = () => {
    if (!editor) return;
    const command = MARK_CONFIGS[type].command;
    (editor.chain().focus() as any)[command]().run();
  };

  return {
    isActive,
    toggleMark,
  };
}

interface Props {
  type: MarkType;
}

export function MarkButton({ type }: Props) {
  const { isActive, toggleMark } = useMark(type);
  const config = MARK_CONFIGS[type];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={toggleMark}
          className={cn(isActive && "text-primary bg-accent")}>
          <config.Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{config.label}</TooltipContent>
    </Tooltip>
  );
}
