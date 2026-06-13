import { A } from '@solidjs/router';
import { PlusIcon } from 'lucide-solid';
import { For, Show } from 'solid-js';
import Header from '../components/header';
import { useNotes } from '../context/note-context';

export default function Home() {
  const { notes, loading } = useNotes();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  // const getLastModifiedDate = (n: Note) => {
  //   return new Date(n.updatedAt || n.createdAt).getTime();
  // };

  return (
    <article class="min-h-dvh bg-neutral-100 dark:bg-neutral-950 dark:text-white grid grid-rows-[auto_1fr] font-main">
      <Header />

      <section class="relative flex flex-col gap-4 w-full px-6 mt-8 max-w-xl mx-auto">
        <Show
          when={loading()}
          fallback={
            <Show
              when={notes().length > 0}
              fallback={
                <div class="text-center py-10 space-y-4 place-items-center">
                  <p class="font-medium text-gray-800 dark:text-gray-600">
                    No notes yet. Create one to get started!
                  </p>
                  <A
                    href="/create"
                    aria-label="Create a new note"
                    class="bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black p-2 md:p-3 rounded-lg font-medium text-xs transition-colors duration-200 hover:bg-neutral-700 dark:hover:bg-neutral-300 fade flex items-center gap-2">
                    <PlusIcon size={16} strokeWidth={2.5} />
                    Create
                  </A>
                </div>
              }>
              <div class="grid gap-4">
                <A
                  href="/create"
                  aria-label="Create a new note"
                  class="bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black px-3 py-2 rounded-lg font-medium text-xs transition-colors duration-200 hover:bg-neutral-700 dark:hover:bg-neutral-300 fade ml-auto flex items-center gap-2">
                  <PlusIcon size={14} strokeWidth={2.5} />
                  Create
                </A>
                <For each={notes()}>
                  {(note) => (
                    <A
                      href={`/notes/${note.id}`}
                      class="rounded-md p-4 bg-neutral-50 dark:bg-black transition-transform duration-200 hover:-translate-y-1 fade shadow-note dark:shadow-note-dark">
                      <h2 class="font-semibold capitalize">{note.title}</h2>
                      <p class="text-neutral-800 dark:text-neutral-400 text-sm font-medium">
                        {note.description.length > 40
                          ? `${note.description.split('\n')[0].slice(0, 40)}...`
                          : note.description.split('\n')[0]}
                      </p>
                      <div class="flex justify-between items-center">
                        <p class="text-xs font-medium text-neutral-600">
                          {formatDate(note.updated_at || note.created_at)}
                        </p>
                      </div>
                    </A>
                  )}
                </For>
              </div>
            </Show>
          }>
          <div class="text-center font-medium py-10">Loading notes...</div>
        </Show>
      </section>
    </article>
  );
}
