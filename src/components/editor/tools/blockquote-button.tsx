"use client";
import { useEffect, useState } from "react";
import { TextQuoteIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";

function useBlockquote() {
  const [isActive, setIsActive] = useState(false);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setIsActive(false);
      return;
    }

    const updateState = () => {
      setIsActive(editor.isActive("blockquote"));
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  const toggleBlockquote = () => {
    if (!editor) return;
    editor.chain().focus().toggleBlockquote().run();
  };

  return {
    isActive,
    toggleBlockquote,
  };
}

export function BlockquoteButton() {
  const { isActive, toggleBlockquote } = useBlockquote();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={toggleBlockquote}
          className={cn(isActive && "text-primary bg-accent")}>
          <TextQuoteIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Blockquote</TooltipContent>
    </Tooltip>
  );
}
