"use client";
import { Fragment, useEffect, useState } from "react";
import { LinkIcon, ExternalLinkIcon, Trash2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";

function useLink() {
  const [isActive, setIsActive] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setIsActive(false);
      setCurrentUrl("");
      return;
    }

    const updateLinkState = () => {
      const active = editor.isActive("link");
      setIsActive(active);

      if (active) {
        const { href } = editor.getAttributes("link");
        setCurrentUrl(href || "");
      } else {
        setCurrentUrl("");
      }
    };

    updateLinkState();
    editor.on("transaction", updateLinkState);

    return () => {
      editor.off("transaction", updateLinkState);
    };
  }, [editor]);

  const setLink = (href: string, text?: string) => {
    if (!editor || !href) return;

    const url = href.match(/^https?:\/\//) ? href : `https://${href}`;
    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (hasSelection) {
      editor.chain().focus().setLink({ href: url }).run();
    } else if (text) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}">${text}</a> `)
        .run();
    }
  };

  const updateLink = (href: string, text?: string) => {
    if (!editor || !href) return;

    const url = href.match(/^https?:\/\//) ? href : `https://${href}`;

    if (text) {
      const { from, to } = editor.state.selection;

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent(`<a href="${url}">${text}</a>`)
        .run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  return { isActive, currentUrl, setLink, updateLink, removeLink };
}

export function LinkDialog() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const { editor } = useRichEditor();
  const { isActive, currentUrl, setLink, updateLink, removeLink } = useLink();

  const handleOpenDialog = () => {
    if (!editor) return;

    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").run();

      const { from, to } = editor.state.selection;
      const linkText = editor.state.doc.textBetween(from, to);

      setUrl(currentUrl);
      setText(linkText);
    } else {
      const { from, to } = editor.state.selection;
      setUrl("");
      setText(editor.state.doc.textBetween(from, to));
    }

    setOpen(true);
  };

  const handleRemoveLink = () => {
    removeLink();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setUrl("");
    setText("");
  };

  const handleSetLink = () => {
    if (!url.trim()) return;

    if (isActive) {
      updateLink(url.trim(), text.trim());
    } else {
      setLink(url.trim(), text.trim());
    }

    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSetLink();
    }
  };

  return (
    <Fragment>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={handleOpenDialog}
            className={cn(isActive && "text-primary bg-accent")}>
            <LinkIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Link</TooltipContent>
      </Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isActive ? "Edit Link" : "Insert Link"}</DialogTitle>
            <DialogDescription>
              {isActive
                ? "Update the URL or link text"
                : "Add a URL and optional text for the link"}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="url">URL</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="url"
                  value={url}
                  autoComplete="off"
                  placeholder="https://example.com"
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {url && (
                  <InputGroupButton
                    size="icon-xs"
                    className="ml-auto"
                    onClick={() => {
                      let finalUrl = url.trim();

                      if (
                        /\.[a-z]{2,}$/i.test(finalUrl) &&
                        !finalUrl.match(/^https?:\/\//)
                      ) {
                        finalUrl = `https://${finalUrl}`;
                      }

                      if (
                        finalUrl.match(/^https?:\/\//) ||
                        /\.[a-z]{2,}$/i.test(url)
                      ) {
                        window.open(finalUrl, "_blank", "noopener,noreferrer");
                      } else {
                        window.location.href = finalUrl;
                      }
                    }}>
                    <ExternalLinkIcon />
                  </InputGroupButton>
                )}
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="text">Text</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="text"
                  placeholder="Link text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </InputGroup>
              <FieldDescription>
                {!isActive && "Leave empty to use selected text"}
              </FieldDescription>
            </Field>
          </FieldGroup>
          <DialogFooter>
            {isActive && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleRemoveLink}
                className="sm:mr-auto">
                <Trash2Icon className="mr-2" />
                Remove Link
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSetLink}
                disabled={!url.trim()}>
                {isActive ? "Update" : "Insert"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
