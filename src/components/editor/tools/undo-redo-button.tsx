"use client";
import { useEffect, useState } from "react";
import { NodeSelection } from "@tiptap/pm/state";
import { Redo2Icon, Undo2Icon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";

export type UndoRedoAction = "undo" | "redo";

function useUndoRedo(action: UndoRedoAction) {
  const [canExecute, setCanExecute] = useState(false);

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setCanExecute(false);
      return;
    }

    const updateState = () => {
      if (!editor.isEditable) {
        setCanExecute(false);
        return;
      }

      const isAvailable =
        action === "undo" ? editor.can().undo() : editor.can().redo();

      if (!isAvailable) {
        setCanExecute(false);
        return;
      }

      const { selection } = editor.state;

      if (selection instanceof NodeSelection) {
        const selectedNode = selection.node;

        if (selectedNode?.type.name === "image") {
          setCanExecute(false);
          return;
        }
      }

      setCanExecute(true);
    };

    updateState();

    editor.on("transaction", updateState);

    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor, action]);

  const execute = () => {
    if (!editor || !canExecute) return;

    const command =
      action === "undo"
        ? editor.chain().focus().undo()
        : editor.chain().focus().redo();

    command.run();
  };

  return {
    canExecute,
    execute,
  };
}

interface Props {
  action: UndoRedoAction;
}

export function UndoRedoButton({ action }: Props) {
  const { canExecute, execute } = useUndoRedo(action);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          disabled={!canExecute}
          onClick={execute}>
          {action === "undo" && <Undo2Icon />}
          {action === "redo" && <Redo2Icon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{action === "undo" ? "Undo" : "Redo"}</TooltipContent>
    </Tooltip>
  );
}
