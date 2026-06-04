import { Show } from 'solid-js';

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
      <div class="fixed inset-0 z-50 w-full min-h-dvh flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div
          onClick={() => props.onCancel()}
          class="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur transition-opacity duration-300"
        />

        <div
          class="bg-white dark:bg-black w-full max-w-md p-6 rounded-xl relative z-50 fade-in space-y-4 fade"
          style={{ 'box-shadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
          <div class="text-sm grid place-items-center gap-2">
            <h3 class="font-medium text-lg fade">Deleting notes</h3>
            <p class="text-sm text-neutral-700 dark:text-neutral-300 fade">
              Do you want to delete this note?
            </p>
          </div>
          <div class="flex justify-center gap-3">
            <button
              onClick={() => props.onCancel()}
              class="bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200 text-sm px-8 py-2 rounded-4xl flex items-center gap-2 fade">
              Cancel
            </button>
            <button
              onClick={() => props.onConfirm()}
              class="bg-red-700 text-white hover:bg-red-600 transition-colors duration-200 text-sm px-8 py-2 rounded-4xl flex items-center gap-2 fade">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
