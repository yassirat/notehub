import { A } from '@solidjs/router';
import { PlusIcon, StickyNotes } from 'lucide-solid';
import { For } from 'solid-js';
import Header from '../components/header';
import { getNotes } from '../lib/storage';
import type { Note } from '../types/notes';

export default function Home() {
  const notes = getNotes();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const getLastModifiedDate = (n: Note) => {
    return new Date(n.updatedAt || n.createdAt).getTime();
  };

  return (
    <article class="min-h-dvh bg-neutral-100 dark:bg-neutral-950 dark:text-white grid grid-rows-[auto_1fr_auto] font-main">
      <Header />

      <section class="relative flex flex-col gap-4 w-full px-6 mt-8 max-w-xl mx-auto">
        <For
          each={notes.sort(
            (a, b) => getLastModifiedDate(b) - getLastModifiedDate(a),
          )}
          fallback={
            <div class="grid gap-1 place-content-center place-items-center mt-12">
              <StickyNotes
                size={28}
                strokeWidth={2.5}
                class="text-gray-600 dark:text-gray-500"
              />
              <p class="text-sm font-medium text-gray-600 dark:text-gray-500">
                No notes here!
              </p>
            </div>
          }>
          {(note) => (
            <A
              href={`/notes/${note.id}`}
              class="rounded-md p-4 bg-neutral-50 dark:bg-black transition-transform duration-200 hover:-translate-y-1 fade shadow-note dark:shadow-note-dark">
              <div class="grid mb-1">
                <h2 class="font-semibold capitalize">{note.title}</h2>
                <p class="text-neutral-800 dark:text-neutral-400 text-sm font-medium">
                  {note.description.length > 40
                    ? `${note.description.split('\n')[0].slice(0, 40)}...`
                    : note.description.split('\n')[0]}
                </p>
              </div>
              <p class="text-xs font-medium text-neutral-600">
                {formatDate(note.createdAt)}
              </p>
            </A>
          )}
        </For>
        <A
          href="/create"
          aria-label="Create a new note"
          class="bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black p-2 md:p-3 rounded-full font-medium text-xs transition-colors duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-300 fade fixed bottom-4 right-4">
          <PlusIcon size={24} strokeWidth={2.5} class="md:size-5" />
        </A>
      </section>
    </article>
  );
}
