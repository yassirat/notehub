import { A } from "@solidjs/router";
import { PlusIcon } from "lucide-solid";
import { For, Show } from "solid-js";
import Header from "../components/header";
import { DotLoading } from "../components/loading";
import { useNotes } from "../context/note-context";

export default function Home() {
  const { notes, loading } = useNotes();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  // const getLastModifiedDate = (n: Note) => {
  //   return new Date(n.updatedAt || n.createdAt).getTime();
  // };

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
                  class="fade ml-auto flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-neutral-700 dark:bg-neutral-200 dark:text-black dark:hover:bg-neutral-300"
                >
                  <PlusIcon size={14} strokeWidth={2.5} />
                  Create
                </A>
                <For each={notes()}>
                  {(note) => (
                    <A
                      href={`/notes/${note.id}`}
                      class="fade shadow-note dark:shadow-note-dark rounded-md bg-neutral-50 p-4 transition-transform duration-200 hover:-translate-y-1 dark:bg-black"
                    >
                      <h2 class="font-semibold capitalize">{note.title}</h2>
                      <p class="text-sm font-medium text-neutral-800 dark:text-neutral-400">
                        {note.description.length > 40
                          ? `${note.description.split("\n")[0].slice(0, 40)}...`
                          : note.description.split("\n")[0]}
                      </p>
                      <div class="flex items-center justify-between">
                        <p class="text-xs font-medium text-neutral-600">
                          {formatDate(note.updated_at || note.created_at)}
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
