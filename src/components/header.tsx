import { A, useLocation } from '@solidjs/router';
import { Moon, MoveLeft, SquarePen, Sun, Trash } from 'lucide-solid';
import { createEffect, createSignal, Show } from 'solid-js';

import pencil from '/pencil_3075908.png';

export default function Header({ setIsDeleteModalOpen }: any) {
  const location = useLocation();

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
    <>
      <header class="py-4 px-4">
        <nav class="max-w-3xl mx-auto flex justify-between items-center sticky top-0">
          <Show
            when={location.pathname === '/'}
            fallback={
              <>
                <A href="/">
                  <MoveLeft size={24} strokeWidth={2.5} />
                </A>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  title="delete note"
                  aria-label="delete note"
                  class="bg-red-700 text-white hover:bg-red-600 transition-colors duration-200 text-xs md:text-sm p-2 rounded-lg flex items-center gap-2 fade">
                  <Trash size={18} strokeWidth={2.5} />
                </button>
              </>
            }>
            <h1 class="text-2xl font-bold">
              <img src={pencil} alt="logo" class="w-10" />
            </h1>
            <div class="flex gap-4">
              <A
                href="/create"
                class="bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-300 flex items-center gap-2 fade">
                <SquarePen size={18} strokeWidth={2.5} />
                Create
              </A>
              <button
                type="button"
                onClick={toggleDarkMode}
                aria-label="Change theme"
                class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900">
                {darkMode() ? (
                  <Sun size={20} strokeWidth={2.5} fill="true" />
                ) : (
                  <Moon size={20} strokeWidth={2.5} fill="true" />
                )}
              </button>
            </div>
          </Show>
        </nav>
      </header>
    </>
  );
}
