import { useNavigate } from '@solidjs/router';
import { LogOutIcon } from 'lucide-solid';
import { createSignal, Show } from 'solid-js';
import ConfirmSignOutModal from '../components/confirm-signout-modal';
import Header from '../components/header';
import { useAuth } from '../context/sign-context';

export default function UserProfile() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  console.log(user());

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/register');
    } catch (err) {
      console.error(err);
    }
  };

  const [isSignOutModalOpen, setIsSignOutModalOpen] = createSignal(false);

  return (
    <main class="bg-neutral-100 dark:bg-neutral-950 dark:text-white min-h-dvh grid grid-rows-[auto_1fr] font-main">
      <Header />
      <section class="space-y-4 h-full w-full place-content-center px-4 max-w-sm mx-auto">
        <Show when={!loading()} fallback={<div>Loading...</div>}>
          <Show when={user()} fallback={<div>Not logged in</div>}>
            <div class="px-4 py-6 dark:shadow-note-dark shadow-note rounded-lg fade grid place-items-center gap-4">
              <h2 class="text-lg font-semibold">{user()?.email}</h2>
              <button
                type="button"
                class="bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black rounded-full font-medium text-sm transition-colors duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-300 fade py-2 px-5 flex items-center gap-2 justify-center"
                onClick={() => setIsSignOutModalOpen(true)}>
                Sign out
                <LogOutIcon size={16} strokeWidth={2.5} />
              </button>
            </div>
          </Show>
        </Show>
      </section>

      {/* Localized confirm warnings dialog */}
      <ConfirmSignOutModal
        isOpen={isSignOutModalOpen()}
        onConfirm={handleSignOut}
        onCancel={() => setIsSignOutModalOpen(false)}
      />
    </main>
  );
}
