"use client";
import { useEffect, useState, useRef, Fragment } from "react";
import { ImageIcon, Upload, Link2Icon, Trash2Icon } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { useRichEditor } from "../rich-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

function useImage() {
  const [isActive, setIsActive] = useState(false);
  const [current, setCurrent] = useState<{ src: string; alt: string } | null>(
    null,
  );

  const { editor } = useRichEditor();

  useEffect(() => {
    if (!editor) {
      setIsActive(false);
      setCurrent(null);
      return;
    }

    const updateImageState = () => {
      const active = editor.isActive("image");
      setIsActive(active);

      if (active) {
        const attrs = editor.getAttributes("image");
        setCurrent({ src: attrs.src || "", alt: attrs.alt || "" });
      } else {
        setCurrent(null);
      }
    };

    updateImageState();
    editor.on("transaction", updateImageState);

    return () => {
      editor.off("transaction", updateImageState);
    };
  }, [editor]);

  const setImage = (src: string, alt?: string) => {
    if (!editor || !src) return;
    editor.chain().focus().setImage({ src, alt }).run();
  };

  const removeImage = () => {
    if (!editor) return;
    editor.chain().focus().deleteSelection().run();
  };

  return { isActive, current, setImage, removeImage };
}

export function ImageDialog() {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isActive, current, setImage, removeImage } = useImage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && isActive && current) {
      setUrl(current.src);
      setAlt(current.alt);
      setPreview(current.src);
    }
  }, [open, isActive, current]);

  const resetForm = () => {
    setUrl("");
    setAlt("");
    setPreview("");
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenDialog = () => {
    if (isActive && current) {
      setUrl(current.src);
      setAlt(current.alt);
      setPreview(current.src);
    } else {
      resetForm();
    }
    setOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid file type");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      alert("Image too large");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
      setUrl("");
      setIsLoading(false);
    };

    reader.onerror = () => {
      setIsLoading(false);
      alert("Error loading image");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleInsertFromUrl = () => {
    if (!url.trim()) {
      alert("URL required");
      return;
    }

    try {
      new URL(url);
    } catch {
      alert("Invalid URL");
      return;
    }

    setImage(url, alt);
    setOpen(false);
    resetForm();
  };

  const handleInsertFromFile = () => {
    if (!preview) {
      alert("No image to insert");
      return;
    }

    setImage(preview, alt);
    setOpen(false);
    resetForm();
  };

  const handleRemoveImage = () => {
    removeImage();
    setOpen(false);
    resetForm();
  };

  const handleInsert = () => {
    if (preview && !url) {
      handleInsertFromFile();
    } else {
      handleInsertFromUrl();
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
            <ImageIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Image</TooltipContent>
      </Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isActive ? "Edit Image" : "Insert Image"}
            </DialogTitle>
            <DialogDescription>
              {isActive
                ? "Update the image URL or alt text"
                : "Add an image from a URL or upload a file (max 5MB)"}
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <Link2Icon className="mr-2" />
                URL
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2" />
                Upload
              </TabsTrigger>
            </TabsList>
            <TabsContent value="url">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="image-url">Image URL</FieldLabel>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleInsertFromUrl()
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="image-alt">
                    Alt text (optional)
                  </FieldLabel>
                  <Input
                    id="image-alt"
                    placeholder="Description of the image"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleInsertFromUrl()
                    }
                  />
                </Field>
              </FieldGroup>
              {url && (
                <div className="border rounded-lg p-2 bg-muted/30 mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <img
                    src={url}
                    alt={alt || "Preview"}
                    className="max-h-48 mx-auto rounded"
                    onError={() => alert("Error loading preview")}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="upload">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="image-file">Upload Image</FieldLabel>
                  <Input
                    id="image-file"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={isLoading}
                    className="cursor-pointer"
                  />
                  <FieldDescription>
                    Supports JPG, PNG, GIF, WebP • Max 5MB
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="upload-alt">
                    Alt text (optional)
                  </FieldLabel>
                  <Input
                    id="upload-alt"
                    placeholder="Description of the image"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleInsertFromFile()
                    }
                  />
                </Field>
              </FieldGroup>
              {isLoading && (
                <div className="border rounded-lg p-4 bg-muted/30 text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Loading image...
                  </p>
                </div>
              )}
              {preview && !isLoading && (
                <div className="border rounded-lg p-2 bg-muted/30 mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <img
                    src={preview}
                    alt={alt || "Preview"}
                    className="max-h-48 mx-auto rounded"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
          <DialogFooter>
            {isActive && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleRemoveImage}
                className="sm:mr-auto">
                <Trash2Icon className="mr-2" />
                Remove Image
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleInsert}
                disabled={(!url && !preview) || isLoading}>
                {isActive ? "Update" : "Insert"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
