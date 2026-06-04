import { A } from '@solidjs/router';
import { FileX } from 'lucide-solid';

export default function NotFound() {
  return (
    <article class="min-h-dvh w-full grid place-content-center bg-neutral-100 dark:bg-neutral-950 dark:text-white font-main">
      <section class="p-4">
        <div class="grid place-items-center place-content-center text-center gap-4 max-w-xl mx-auto">
          <div
            class="bg-white dark:bg-black p-4 rounded-lg"
            style={{ 'box-shadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            <FileX size={40} strokeWidth={2.5} />
          </div>
          <div class="space-y-2 font-medium">
            <p class="text-gray-700 dark:text-gray-300 text-sm lg:text-base">
              Oops! We couldn't find that note
            </p>
            <p class="text-gray-700 dark:text-gray-300 text-sm lg:text-base">
              The link might be broken, or the note may have been archived or
              deleted. Don't worry, your other thoughts are still safe.
            </p>
          </div>
          <A
            href="/"
            class="mt-4 bg-black text-white dark:bg-neutral-100 dark:text-black font-medium text-sm px-5 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200">
            Go Back
          </A>
        </div>
      </section>
    </article>
  );
}
