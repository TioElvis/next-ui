"use client";
import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import { MarkButton } from "./tools/mark-button";
import { LinkDialog } from "./tools/link-dialog";
import { ImageDialog } from "./tools/image-dialog";
import { Separator } from "@/components/ui/separator";
import { UndoRedoButton } from "./tools/undo-redo-button";
import { CodeBlockButton } from "./tools/code-block-button";
import { BlockquoteButton } from "./tools/blockquote-button";
import { ListDropdownMenu } from "./tools/list-dropdown-menu";
import { HeadingDropdownMenu } from "./tools/heading-dropdown-menu";
import { HighlightDropdownMenu } from "./tools/highlight-dropdown-menu";

type Props = PropsWithChildren<ComponentProps<"header">>;

export function Toolbar({ className, ...props }: Props) {
  return (
    <header
      className={cn(
        "px-4 py-1 border-b md:grid md:place-items-center",
        className,
      )}
      {...props}>
      <section className="flex items-center gap-2 md:gap-0.5 h-8 overflow-x-auto overflow-y-hidden flex-nowrap no-scrollbar">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
        <Separator
          orientation="vertical"
          className="shrink-0 hidden md:block"
        />
        <HeadingDropdownMenu />
        <ListDropdownMenu />
        <BlockquoteButton />
        <CodeBlockButton />
        <Separator
          orientation="vertical"
          className="shrink-0 hidden md:block"
        />
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <Separator
          orientation="vertical"
          className="shrink-0 hidden md:block"
        />
        <HighlightDropdownMenu />
        <LinkDialog />
        <ImageDialog />
      </section>
    </header>
  );
}
