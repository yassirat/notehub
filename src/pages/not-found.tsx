import { A } from "@solidjs/router";
import { FileX } from "lucide-solid";

export default function NotFound() {
  return (
    <article class="font-main grid min-h-dvh w-full place-content-center bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <section class="p-4">
        <div class="mx-auto grid max-w-xl place-content-center place-items-center gap-4 text-center">
          <div
            class="rounded-lg bg-white p-4 dark:bg-black"
            style={{ "box-shadow": "rgba(149, 157, 165, 0.3) 0px 8px 24px" }}
          >
            <FileX size={40} strokeWidth={2.5} />
          </div>
          <div class="space-y-2 font-medium">
            <p class="text-sm text-gray-700 lg:text-base dark:text-gray-300">
              Oops! We couldn't find that note
            </p>
            <p class="text-sm text-gray-700 lg:text-base dark:text-gray-300">
              The link might be broken, or the note may have been archived or
              deleted. Don't worry, your other thoughts are still safe.
            </p>
          </div>
          <A
            href="/"
            class="mt-4 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-200"
          >
            Go to Home
          </A>
        </div>
      </section>
    </article>
  );
}
