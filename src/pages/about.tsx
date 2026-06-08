import Header from '../components/header';

export default function About() {
  return (
    <article class="min-h-dvh w-full grid grid-rows-[auto_1fr_auto] bg-neutral-100 dark:bg-neutral-950 dark:text-white font-main">
      <Header />
      <section class="p-4 h-full place-content-center max-w-xl mx-auto">
        <p>
          NotoHub is a premium, production-ready, minimalist note-taking web
          application designed with modern, calming aesthetics.
        </p>
      </section>
      <footer class="bg-slate-300 dark:bg-slate-500 text-center py-4">
        <p class="font-medium">
          All rights reserved {new Date().getFullYear()}
        </p>
      </footer>
    </article>
  );
}
