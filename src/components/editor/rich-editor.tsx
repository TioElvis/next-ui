"use client";
import "./styles.css";

import { Image } from "@tiptap/extension-image";
import { StarterKit } from "@tiptap/starter-kit";
import { createContext, useContext } from "react";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";

interface Context {
  editor: Editor | null;
}

export const RichEditorContext = createContext<Context | null>(null);

interface Provider {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  children: React.ReactNode;
}

export function RichEditorProvider(props: Provider) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          autolink: true,
          openOnClick: false,
          linkOnPaste: true,
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    immediatelyRender: false,
    content: props.content,
    onUpdate: ({ editor }) => {
      props.setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellCheck: "true",
      },
    },
  });

  return (
    <RichEditorContext.Provider value={{ editor }}>
      {props.children}
    </RichEditorContext.Provider>
  );
}

export function useRichEditor() {
  const context = useContext(RichEditorContext);

  if (!context) {
    throw new Error("useRichEditor must be used within a RichEditorProvider");
  }

  return context;
}

export function RichEditor() {
  const { editor } = useRichEditor();

  return <EditorContent editor={editor} />;
}
