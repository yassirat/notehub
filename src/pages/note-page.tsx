import { useNavigate, useParams } from '@solidjs/router';
import { Pencil } from 'lucide-solid';
import { createSignal, onMount, Show } from 'solid-js';

import { toast } from 'solid-sonner';
import ConfirmModal from '../components/confirm-modal';
import Header from '../components/header';
import { getNotes, saveNotes } from '../lib/storage';

export default function NotePage() {
  const notes = getNotes();

  const params = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === params.id);
  const [title, setTitle] = createSignal(note?.title || '');
  const [description, setDescription] = createSignal(note?.description || '');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);

  if (!note) {
    return <h1>Note not found</h1>;
  }

  const updateNote = () => {
    const updated = notes.map((n) =>
      n.id === params.id
        ? {
            ...n,
            title: title(),
            description: description(),
            updatedAt: new Date().toISOString(),
          }
        : n,
    );

    saveNotes(updated);

    toast.success('Note has been edited');
  };

  const deleteNote = () => {
    setIsDeleteModalOpen(false);

    const filtered = notes.filter((n) => n.id !== params.id);

    saveNotes(filtered);

    toast.success('Note has been removed');

    setTimeout(() => {
      navigate('/');
    }, 50);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  let textareaRef: HTMLTextAreaElement | undefined;

  const handleInput = () => {
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      textareaRef.style.height = `${textareaRef.scrollHeight}px`;
      setDescription(textareaRef.value);
    }
  };

  onMount(() => {
    // Set initial height
    if (textareaRef) {
      textareaRef.style.height = `${textareaRef.scrollHeight}px`;
    }
  });

  const isEdited = () => {
    return title() !== note.title || description() !== note.description;
  };

  const resetChanges = () => {
    setTitle(note.title);
    setDescription(note.description);

    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  return (
    <article class="min-h-dvh grid grid-rows-[auto_1fr_auto] font-main bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <Header setIsDeleteModalOpen={setIsDeleteModalOpen} />

      <main class="p-4">
        <section class="max-w-xl mx-auto">
          <div class="mb-2 -space-y-2">
            <input
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              class="w-full p-3 font-semibold capitalize focus:outline-none fade"
            />

            <p class="text-xs text-gray-700 dark:text-gray-500 font-medium pl-3 fade">
              {formatDate(note.createdAt)}
              <span> | </span>
              {description().replace(/\s/g, '').length} characters
            </p>
          </div>

          <textarea
            ref={textareaRef}
            value={description()}
            onInput={handleInput}
            class="w-full p-3 focus:outline-none resize-none font-medium text-gray-900 dark:text-gray-300 text-sm leading-relaxed fade"
            style={{
              'min-height': '100px',
              'max-height': 'none',
              overflow: 'hidden',
            }}></textarea>
        </section>
      </main>

      <footer class="p-4">
        <div class="flex gap-3 justify-end max-w-3xl mx-auto">
          <Show when={isEdited()}>
            <div class="flex gap-2">
              <button
                onClick={updateNote}
                class="bg-lime-700 hover:bg-lime-600 text-white text-sm transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
                <Pencil size={18} />
                Save
              </button>

              <button
                onClick={resetChanges}
                class="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600   text-sm transition-colors px-4 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </Show>
        </div>
      </footer>

      {/* Localized confirm warnings dialog */}
      <ConfirmModal
        isOpen={isDeleteModalOpen()}
        onConfirm={deleteNote}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </article>
  );
}
