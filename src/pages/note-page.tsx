import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, createSignal, onMount } from 'solid-js';

import { toast } from 'solid-sonner';
import ConfirmModal from '../components/confirm-modal';
import Header from '../components/header';
import Loading from '../components/loading';
import { useNotes } from '../context/note-context';

export default function NotePage() {
  const { getNoteById, updateNote, deleteNote } = useNotes();

  const params = useParams();
  const navigate = useNavigate();

  const note = getNoteById(params.id!);
  const [title, setTitle] = createSignal(note?.title || '');
  const [description, setDescription] = createSignal(note?.description || '');
  const [loading, setLoading] = createSignal(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);

  // Initialize form with note data
  createEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  });

  if (!note) {
    return <h1 class="text-center text-2xl mt-10">Note not found</h1>;
  }

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await updateNote(note.id, title(), description());
      toast.success('Note has been edited');
    } catch (error) {
      toast.error('Failed to update note');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    setLoading(true);

    try {
      await deleteNote(note.id);
      toast.success('Note has been removed');

      setTimeout(() => {
        navigate('/');
      }, 300);
    } catch (error) {
      toast.error('Failed to delete note');
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  if (loading()) {
    return <Loading />;
  }

  return (
    <article class="min-h-dvh grid grid-rows-[auto_1fr] font-main bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <Header
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        isEdited={isEdited}
        updateNote={handleUpdate}
      />

      <main class="p-4">
        <section class="max-w-xl mx-auto">
          <div class="mb-2 -space-y-2">
            <input
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              class="w-full p-3 font-semibold capitalize focus:outline-none fade"
            />

            <p class="text-xs text-gray-700 dark:text-gray-500 font-medium pl-3 fade">
              {formatDate(note.updated_at || note.created_at)}
              <span> | </span>
              {description().replace(/\s/g, '').length} characters
            </p>
          </div>

          <textarea
            ref={textareaRef}
            value={description()}
            onInput={handleInput}
            class="w-full p-3 focus:outline-none resize-none font-medium text-gray-900 dark:text-gray-300 text-sm lg:text-base leading-relaxed"
            style={{
              'min-height': '100px',
              'max-height': 'none',
              overflow: 'hidden',
            }}></textarea>
        </section>
      </main>

      {/* Localized confirm warnings dialog */}
      <ConfirmModal
        isOpen={isDeleteModalOpen()}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </article>
  );
}
