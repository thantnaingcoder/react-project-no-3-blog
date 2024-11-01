import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useState } from "react";

export default function Editor({ onContentChange } : { onContentChange: (content: string) => void }) {
  const editor = useCreateBlockNote();

  // Listen for content changes and pass it up to the parent component
  editor.events.on("contentChange", () => {
    onContentChange(editor.getContent());
  });

  return <BlockNoteView editor={editor} />;
}
