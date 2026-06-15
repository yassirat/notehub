import { A, useLocation } from '@solidjs/router';
import {
  CheckIcon,
  Moon,
  MoveLeft,
  Sun,
  Trash2Icon,
  UserRound,
} from 'lucide-solid';
import { createEffect, createSignal, Match, Show, Switch } from 'solid-js';

import { useNotes } from '../context/note-context';
import pencil from '/pencil_3075908.png';

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
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', darkMode() ? 'dark' : 'light');
  };

  createEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  });

  return (
    <header class="py-4 px-4">
      <nav class="max-w-3xl mx-auto flex justify-between items-center sticky top-0">
        <Switch>
          {/* Home route */}
          <Match when={location.pathname === '/'}>
            <A href="/" class="flex items-center gap-2">
              <img src={pencil} alt="logo" class="w-8" />
              <h1 class="text-xl font-bold hidden md:block">NotoHub</h1>
            </A>
            <div class="flex items-center gap-2">
              <A
                href="/user"
                title="profile"
                aria-label="Go to user profile"
                class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900">
                <UserRound size={18} strokeWidth={2.5} />
              </A>
              <button
                type="button"
                onClick={toggleDarkMode}
                title="Change theme"
                aria-label="Change theme"
                class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900">
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
              location.pathname === '/create' || location.pathname === '/user'
            }>
            <A href="/" aria-label="Go back">
              <MoveLeft size={24} strokeWidth={2.5} />
            </A>
          </Match>

          {/* About route */}
          <Match when={location.pathname === '/about'}>
            <A href="/" aria-label="Go back">
              <MoveLeft size={24} strokeWidth={2.5} />
            </A>
          </Match>

          {/* Note detail route */}
          <Match when={location.pathname.startsWith('/notes/')}>
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
                  class="bg-lime-700 hover:bg-lime-600 text-white text-sm transition-colors p-2 rounded-lg hide-show disabled:opacity-50">
                  {loading() ? (
                    'Saving...'
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
                class="bg-red-700 text-white hover:bg-red-600 transition-colors duration-200 p-2 rounded-lg fade">
                <Trash2Icon size={16} strokeWidth={2.5} />
              </button>
            </div>
          </Match>
        </Switch>
      </nav>
    </header>
  );
}
