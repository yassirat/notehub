import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { onCleanup, onMount } from 'solid-js';

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor(props: Props) {
  let editorElement!: HTMLDivElement;
  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      element: editorElement,
      extensions: [StarterKit],
      content: props.content,

      editorProps: {
        attributes: {
          class:
            'min-h-[250px] border rounded-lg p-4 outline-none prose max-w-none',
        },
      },

      onUpdate: ({ editor }) => {
        props.onChange(editor.getHTML());
      },
    });
  });

  onCleanup(() => {
    editor?.destroy();
  });

  return (
    <div>
      <div ref={editorElement} />
    </div>
  );
}
