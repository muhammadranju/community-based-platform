"use client";

import * as React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { EditorTheme } from "./themes/EditorTheme";
import { ToolbarPlugin } from "./Toolbar";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot, $insertNodes } from "lexical";

function Placeholder() {
  return (
    <div className="editor-placeholder absolute top-14 left-4 text-muted-foreground pointer-events-none">
      Start writing...
    </div>
  );
}

// Custom plugin to handle HTML changes
function HtmlPlugin({
  onHtmlChanged,
  initialHtml,
}: {
  onHtmlChanged: (html: string, text: string) => void;
  initialHtml?: string;
}) {
  const [editor] = useLexicalComposerContext();
  const isInitialized = React.useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    if (initialHtml) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialHtml, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $getRoot().select();
        $insertNodes(nodes);
      });
    }
  }, [editor, initialHtml]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor);
          const text = $getRoot().getTextContent();
          onHtmlChanged(html, text);
        });
      }}
    />
  );
}

const editorConfig = {
  namespace: "MyEditor",
  theme: EditorTheme,
  onError(error: Error) {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
  ],
};

interface EditorProps {
  value?: string;
  onChange: (html: string, text: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="relative rounded-md border bg-background text-foreground shadow-sm">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container relative z-0 flex flex-col">
          <ToolbarPlugin />
          <div className="relative min-h-[200px]">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input min-h-[150px] p-4 outline-none resize-y overflow-auto h-full" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={({ children }) => <div>{children}</div>}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <HtmlPlugin onHtmlChanged={onChange} initialHtml={value} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
