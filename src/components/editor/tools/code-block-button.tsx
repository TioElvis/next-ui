"use client";
import { CodeIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";

function useCodeBlock() {
  const [isActive, setIsActive] = useState(false);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setIsActive(false);
      return;
    }

    const updateState = () => {
      setIsActive(editor.isActive("codeBlock"));
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  const toggleCodeBlock = () => {
    if (!editor) return;
    editor.chain().focus().toggleCodeBlock().run();
  };

  return {
    isActive,
    toggleCodeBlock,
  };
}

export function CodeBlockButton() {
  const { isActive, toggleCodeBlock } = useCodeBlock();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={toggleCodeBlock}
          className={cn(isActive && "text-primary bg-accent")}>
          <CodeIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Code Block</TooltipContent>
    </Tooltip>
  );
}
