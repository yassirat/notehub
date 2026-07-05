import { A, useLocation } from "@solidjs/router";
import { CheckIcon, Moon, MoveLeft, Sun, Trash2Icon } from "lucide-solid";
import { createEffect, createSignal, Match, Show, Switch } from "solid-js";

import { useNotes } from "../context/note-context";
import { useAuth } from "../context/sign-context";

interface HeaderProps {
  setIsDeleteModalOpen?: (value: boolean) => void;
  isEdited?: () => boolean;
  updateNote?: () => void;
}

export default function Header(props: HeaderProps) {
  const location = useLocation();

  const { loading } = useNotes();

  const [darkMode, setDarkMode] = createSignal(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode());
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", darkMode() ? "dark" : "light");
  };

  createEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  });

  const { user } = useAuth();

  return (
    <header class="sticky top-0 z-10 bg-neutral-100 px-4 py-4 dark:bg-neutral-950">
      <nav class="mx-auto flex max-w-3xl items-center justify-between">
        <Switch>
          {/* Home route */}
          <Match when={location.pathname === "/"}>
            <A href="/" class="text-xl font-extrabold">
              NotoHub.
            </A>
            <div class="flex items-center gap-2">
              <A
                href="/user"
                title="profile"
                aria-label="Go to user profile"
                class="flex size-7 items-center justify-center rounded-full bg-neutral-900 p-2 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-300"
              >
                {user()?.email?.slice(0, 1).toUpperCase()}
              </A>
              <button
                type="button"
                onClick={toggleDarkMode}
                title="Change theme"
                aria-label="Change theme"
                class="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-900"
              >
                {darkMode() ? (
                  <Sun size={18} strokeWidth={2.5} fill="true" />
                ) : (
                  <Moon size={18} strokeWidth={2.5} fill="true" />
                )}
              </button>
            </div>
          </Match>

          {/* Create route */}
          <Match
            when={
              location.pathname === "/create" || location.pathname === "/user"
            }
          >
            <A href="/" aria-label="Go back">
              <MoveLeft size={24} strokeWidth={2.5} />
            </A>
          </Match>

          {/* About route */}
          <Match when={location.pathname === "/about"}>
            <A href="/" aria-label="Go back">
              <MoveLeft size={24} strokeWidth={2.5} />
            </A>
          </Match>

          {/* Note detail route */}
          <Match when={location.pathname.startsWith("/notes/")}>
            <A href="/" aria-label="Go back">
              <MoveLeft size={24} strokeWidth={2.5} />
            </A>
            <div class="flex gap-4">
              <Show when={props.isEdited?.()}>
                <button
                  type="button"
                  onClick={props.updateNote}
                  title="Edit note"
                  aria-label="Edit note"
                  disabled={loading()}
                  class="hide-show rounded-lg bg-lime-700 p-2 text-sm text-white transition-colors hover:bg-lime-600 disabled:opacity-50"
                >
                  {loading() ? (
                    "Saving..."
                  ) : (
                    <div class="flex items-center gap-2 px-1">
                      <CheckIcon size={16} strokeWidth={2.5} />
                      <span class="hidden sm:block">Edit</span>
                    </div>
                  )}
                </button>
              </Show>
              <button
                type="button"
                onClick={() => props.setIsDeleteModalOpen?.(true)}
                title="Delete note"
                aria-label="Delete note"
                class="fade rounded-lg bg-red-700 p-2 text-white transition-colors duration-200 hover:bg-red-600"
              >
                <Trash2Icon size={16} strokeWidth={2.5} />
              </button>
            </div>
          </Match>
        </Switch>
      </nav>
    </header>
  );
}
