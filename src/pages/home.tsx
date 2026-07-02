import { A } from "@solidjs/router";
import { PlusIcon, SquarePen } from "lucide-solid";
import { createEffect, createSignal, For, Show } from "solid-js";
import Header from "../components/header";
import { DotLoading } from "../components/loading";
import { useNotes } from "../context/note-context";
import { formatRelativeDate } from "../utils/format-date";

export default function Home() {
  const { notes, loading } = useNotes();

  const [screenWidth, setScreenWidth] = createSignal(window.innerWidth);

  createEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const getMaxLength = () => {
    const width = screenWidth();
    if (width < 640) return 30; // Mobile
    if (width < 1024) return 50; // Tablet
    return 80; // Desktop
  };

  const truncateText = (text: string, maxLength: number) => {
    const firstLine = text.split("\n")[0];
    return firstLine.length > maxLength
      ? `${firstLine.slice(0, maxLength)}...`
      : firstLine;
  };

  return (
    <article class="font-main grid min-h-dvh grid-rows-[auto_1fr] bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <Header />

      <section class="relative mx-auto flex w-full max-w-xl flex-col gap-4 px-6 py-8">
        <Show
          when={loading()}
          fallback={
            <Show
              when={notes().length > 0}
              fallback={
                <div class="place-items-center space-y-4 py-10 text-center">
                  <p class="font-medium text-gray-800 dark:text-gray-600">
                    No notes yet. Create one to get started!
                  </p>
                  <A
                    href="/create"
                    aria-label="Create a new note"
                    class="fade flex items-center gap-2 rounded-lg bg-neutral-900 p-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-neutral-700 md:p-3 dark:bg-neutral-200 dark:text-black dark:hover:bg-neutral-300"
                  >
                    <PlusIcon size={16} strokeWidth={2.5} />
                    Create
                  </A>
                </div>
              }
            >
              <div class="grid gap-4">
                <A
                  href="/create"
                  aria-label="Create a new note"
                  class="fade ml-auto rounded-lg bg-neutral-900 p-2 text-white transition-colors duration-200 hover:bg-neutral-700 dark:bg-neutral-200 dark:text-black dark:hover:bg-neutral-300"
                >
                  <SquarePen size={14} strokeWidth={2.7} />
                </A>
                <For each={notes()}>
                  {(note) => (
                    <A
                      href={`/notes/${note.id}`}
                      class="fade shadow-note dark:shadow-note-dark rounded-md bg-neutral-50 p-4 transition-transform duration-200 hover:-translate-y-1 dark:bg-black"
                    >
                      <h2 class="text-sm font-semibold capitalize">
                        {truncateText(note.title, getMaxLength())}
                      </h2>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-medium text-nowrap text-neutral-700 dark:text-neutral-300">
                          {formatRelativeDate(note.created_at)}
                        </span>
                        <p class="text-xs font-medium text-nowrap text-neutral-600 dark:text-neutral-400">
                          {truncateText(note.description, getMaxLength())}
                        </p>
                      </div>
                    </A>
                  )}
                </For>
              </div>
            </Show>
          }
        >
          <DotLoading />
        </Show>
      </section>
    </article>
  );
}
