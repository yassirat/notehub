import { Show } from "solid-js";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 z-50 flex min-h-dvh w-full items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div
          onClick={() => props.onCancel()}
          class="fixed inset-0 bg-white/30 backdrop-blur transition-opacity duration-300 dark:bg-black/30"
        />

        <div
          class="fade-in fade relative z-50 w-full max-w-md space-y-4 rounded-xl bg-white p-6 dark:bg-black"
          style={{ "box-shadow": "rgba(149, 157, 165, 0.3) 0px 8px 24px" }}
        >
          <div class="grid place-items-center gap-2 text-sm">
            <h3 class="fade text-lg font-medium">Deleting notes</h3>
            <p class="fade text-sm text-neutral-700 dark:text-neutral-300">
              Do you want to delete this note?
            </p>
          </div>
          <div class="flex justify-center gap-3">
            <button
              onClick={() => props.onCancel()}
              class="fade flex items-center gap-2 rounded-4xl bg-gray-700 px-8 py-2 text-sm text-white transition-colors duration-200 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => props.onConfirm()}
              class="fade flex items-center gap-2 rounded-4xl bg-red-700 px-8 py-2 text-sm text-white transition-colors duration-200 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
