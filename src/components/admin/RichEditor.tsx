"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useState } from "react";
import MediaLibraryDialog from "./MediaLibraryDialog";

/**
 * Rich-text editor for blog and case-study bodies. Writes HTML into a hidden
 * input called `name`, so the surrounding <form> posts it like any field.
 * The server sanitises it again before saving.
 */
export default function RichEditor({ name, defaultValue, placeholder }: { name: string; defaultValue: string; placeholder?: string }) {
  const [html, setHtml] = useState(defaultValue);
  const [picking, setPicking] = useState(false);
  const closePicker = useCallback(() => setPicking(false), []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, codeBlock: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
    ],
    content: defaultValue,
    editorProps: { attributes: { class: "adm-prose" } },
    onUpdate: ({ editor: e }) => setHtml(e.isEmpty ? "" : e.getHTML()),
  });

  return (
    <div className="adm-editor">
      <input type="hidden" name={name} value={html} />
      {editor && <Toolbar editor={editor} onImage={() => setPicking(true)} />}
      <EditorContent editor={editor} />
      {picking && editor && (
        <MediaLibraryDialog
          onClose={closePicker}
          onPick={(row) => {
            editor.chain().focus().setImage({ src: row.url, alt: row.alt }).run();
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

function Toolbar({ editor, onImage }: { editor: Editor; onImage: () => void }) {
  const btn = (label: string, title: string, run: () => void, active = false) => (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={active ? "is-on" : undefined}
      onMouseDown={(e) => e.preventDefault()}
      onClick={run}
    >
      {label}
    </button>
  );
  const c = () => editor.chain().focus();

  const setLink = () => {
    const prev = (editor.getAttributes("link").href as string | undefined) ?? "";
    const url = window.prompt("Link address (e.g. /pricing/ or https://…). Leave empty to remove.", prev);
    if (url === null) return;
    if (url.trim() === "") c().extendMarkRange("link").unsetLink().run();
    else c().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="adm-toolbar" role="toolbar" aria-label="Formatting">
      {btn("H2", "Heading", () => c().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
      {btn("H3", "Sub-heading", () => c().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
      {btn("B", "Bold", () => c().toggleBold().run(), editor.isActive("bold"))}
      {btn("I", "Italic", () => c().toggleItalic().run(), editor.isActive("italic"))}
      {btn("• List", "Bullet list", () => c().toggleBulletList().run(), editor.isActive("bulletList"))}
      {btn("1. List", "Numbered list", () => c().toggleOrderedList().run(), editor.isActive("orderedList"))}
      {btn("❝ Callout", "Callout box", () => c().toggleBlockquote().run(), editor.isActive("blockquote"))}
      {btn("Link", "Add or edit link", setLink, editor.isActive("link"))}
      {btn("Image", "Insert image", onImage)}
      {btn("Table", "Insert table", () => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
      {editor.isActive("table") && (
        <>
          {btn("+Row", "Add row", () => c().addRowAfter().run())}
          {btn("+Col", "Add column", () => c().addColumnAfter().run())}
          {btn("−Row", "Delete row", () => c().deleteRow().run())}
          {btn("−Col", "Delete column", () => c().deleteColumn().run())}
          {btn("✕Table", "Delete table", () => c().deleteTable().run())}
        </>
      )}
      {btn("―", "Divider line", () => c().setHorizontalRule().run())}
      {btn("↶", "Undo", () => c().undo().run())}
      {btn("↷", "Redo", () => c().redo().run())}
    </div>
  );
}
