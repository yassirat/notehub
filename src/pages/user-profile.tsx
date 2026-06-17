import { useNavigate } from "@solidjs/router";
import { LogOutIcon } from "lucide-solid";
import { createSignal, Show } from "solid-js";
import ConfirmSignOutModal from "../components/confirm-signout-modal";
import Header from "../components/header";
import { useAuth } from "../context/sign-context";

export default function UserProfile() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  console.log(user());

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/register");
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  const [isSignOutModalOpen, setIsSignOutModalOpen] = createSignal(false);

  return (
    <main class="font-main grid min-h-dvh grid-rows-[auto_1fr] bg-neutral-100 dark:bg-neutral-950 dark:text-white">
      <Header />
      <section class="mx-auto h-full w-full max-w-sm place-content-center space-y-4 px-4">
        <Show when={!loading()} fallback={<div>Loading...</div>}>
          <Show when={user()} fallback={<div>Not logged in</div>}>
            <div class="dark:shadow-note-dark shadow-note fade grid place-items-center gap-4 rounded-lg px-4 py-6">
              <h4 class="text-lg font-semibold">{user()?.email}</h4>
              <h4 class="font-medium">
                Created: {formatDate(user()?.created_at!)}
              </h4>
              <button
                type="button"
                class="fade flex items-center justify-center gap-2 rounded-full bg-red-700 px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-600"
                onClick={() => setIsSignOutModalOpen(true)}
              >
                Sign Out
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
