import { useNavigate } from '@solidjs/router';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { Check } from 'lucide-solid';
import { createSignal, onMount } from 'solid-js';
import Header from '../components/header';
import { getNotes, saveNotes } from '../lib/storage';

export default function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');

  const handleSave = () => {
    const notes = getNotes();

    const newNote = {
      id: Math.random().toString(36).substring(2, 11),
      title: title(),
      description: description(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveNotes([...notes, newNote]);

    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  let editorRef: HTMLTextAreaElement | undefined;
  let mdeInstance: EasyMDE | undefined;

  onMount(() => {
    if (editorRef) {
      mdeInstance = new EasyMDE({
        element: editorRef,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        initialValue: description(),
      });

      // Update description when editor changes
      editorRef.addEventListener('change', () => {
        setDescription(mdeInstance?.value() || '');
      });
    }
  });

  return (
    <article class="min-h-dvh grid grid-rows-[auto_1fr] font-main bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <Header />

      <main class="p-4">
        <section class="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Note title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
            class="w-full p-3 focus:outline-none text-lg md:text-xl placeholder:font-normal font-semibold"
          />

          <textarea
            placeholder="Note Content"
            value={description()}
            onInput={(e) => {
              setDescription(e.currentTarget.value);
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            class="w-full p-3 mb-4 text-sm lg:text-base focus:outline-none resize-none overflow-hidden placeholder:font-normal font-medium"></textarea>

          <button
            onClick={handleSave}
            class="mt-4 bg-black text-white dark:bg-neutral-100 dark:text-black text-sm px-5 py-2 rounded-lg flex items-center float-end gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200">
            Save Note
            <Check size={18} strokeWidth={2.5} />
          </button>
        </section>
      </main>
    </article>
  );
}
