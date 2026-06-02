import { useNavigate, useParams } from '@solidjs/router';
import { Pencil, Trash } from 'lucide-solid';
import { createSignal, onMount } from 'solid-js';
import Header from '../components/header';
import { getNotes, saveNotes } from '../lib/storage';

export default function NotePage() {
  const notes = getNotes();

  const params = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === params.id);

  const [title, setTitle] = createSignal(note?.title || '');

  const [description, setDescription] = createSignal(note?.description || '');

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

    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const deleteNote = () => {
    const filtered = notes.filter((n) => n.id !== params.id);

    saveNotes(filtered);

    setTimeout(() => {
      navigate('/');
    }, 500);
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

  return (
    <article class="min-h-dvh grid grid-rows-[auto_1fr_auto] font-main bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <Header />

      <main class="p-4">
        <section class="relative max-w-xl mx-auto">
          <div class="grid mb-4">
            <input
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              class="w-full p-3 font-semibold capitalize text-xl md:text-2xl focus:outline-none fade"
            />

            <p class="text-xs text-gray-800 dark:text-gray-700 font-medium pl-3 fade">
              {formatDate(note.createdAt)}
              <span> | </span>
              {description().replace(/\s/g, '').length} characters
            </p>
          </div>

          <textarea
            ref={textareaRef}
            value={description()}
            onInput={handleInput}
            class="w-full p-3 font-medium focus:outline-none resize-none text-gray-900 dark:text-gray-300 text-sm fade"
            style={{
              'min-height': '100px',
              'max-height': 'none',
              overflow: 'hidden',
            }}></textarea>
        </section>
      </main>

      <footer class="p-4">
        <div class="flex gap-3 justify-end max-w-3xl mx-auto">
          <button
            onClick={updateNote}
            class="bg-emerald-700 hover:bg-emerald-600 text-white transition-colors duration-200 text-xs md:text-sm px-4 py-2 rounded flex items-center gap-2 fade">
            <Pencil size={18} strokeWidth={2.5} />
            Update
          </button>

          <button
            onClick={deleteNote}
            class="bg-red-700 text-white hover:bg-red-600 transition-colors duration-200 text-xs md:text-sm px-4 py-2 rounded flex items-center gap-2 fade">
            <Trash size={18} strokeWidth={2.5} />
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
}
