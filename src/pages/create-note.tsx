import { useNavigate } from '@solidjs/router';
import { Check } from 'lucide-solid';
import { createSignal } from 'solid-js';
import { toast } from 'solid-sonner';
import Header from '../components/header';
import { useNotes } from '../context/note-context';

export default function CreateNote() {
  const { createNote } = useNotes();
  const navigate = useNavigate();

  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSave = async () => {
    if (!title().trim()) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);

    try {
      await createNote(title(), description());
      toast.success('Note created successfully');

      setTimeout(() => {
        navigate('/');
      }, 300);
    } catch (error) {
      toast.error('Failed to create note');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            class="w-full p-3 focus:outline-none text-lg md:text-xl placeholder:font-normal font-semibold fade"
          />

          <textarea
            placeholder="Note Content"
            value={description()}
            onInput={(e) => {
              setDescription(e.currentTarget.value);
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            class="w-full p-3 mb-4 text-sm lg:text-base focus:outline-none resize-none overflow-hidden font-medium text-gray-800 dark:text-gray-300 fade"
            autofocus></textarea>

          <div class="mt-4 float-end">
            <button
              onClick={handleSave}
              disabled={loading()}
              aria-label="Add the note"
              class="bg-black text-white dark:bg-neutral-100 dark:text-black text-sm px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 fade">
              {loading() ? (
                'Adding...'
              ) : (
                <>
                  Add
                  <Check size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </article>
  );
}
