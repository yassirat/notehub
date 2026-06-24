import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { useAuth } from "../context/sign-context";
import type { ShowFormProps } from "../pages/register-page";
import { SpinnerLoading } from "./loading";

export const SignUp = (props: ShowFormProps) => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signUp({ email: email(), password: password() });

      if (result) {
        navigate("/");
      }
    } catch (err) {
      setError(`${err}: error occured`);
    } finally {
      <SpinnerLoading />;
    }
  };

  return (
    <form class="flex w-full flex-col gap-4" onSubmit={handleSignUp}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        class="w-full rounded-sm border border-neutral-700 p-2 text-sm font-medium focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="w-full rounded-sm border border-neutral-700 p-2 text-sm font-medium focus:outline-none"
      />
      <p class="text-sm">
        Already have an account?{" "}
        <span
          class="cursor-pointer font-semibold text-neutral-400 hover:underline"
          onClick={() => props.showForm()}
        >
          Sign in
        </span>
      </p>
      <button
        type="submit"
        class="rounded bg-neutral-200 px-4 py-2 text-sm text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-300"
      >
        Sign up
      </button>

      <Show when={error()}>
        <p>{error()}</p>
      </Show>
    </form>
  );
};

export const SignIn = (props: ShowFormProps) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signIn({ email: email(), password: password() });

      if (result) {
        navigate("/");
      }
    } catch (err) {
      setError(`${err}: error occured`);
    }
  };

  return (
    <form class="flex w-full flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        class="w-full rounded-sm border border-neutral-700 p-2 text-sm font-medium focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="w-full rounded-sm border border-neutral-700 p-2 text-sm font-medium focus:outline-none"
      />
      <p class="text-sm">
        No account yet?{" "}
        <span
          class="cursor-pointer font-semibold text-neutral-700 hover:underline"
          onClick={props.showForm}
        >
          Create one
        </span>
      </p>
      <button
        type="submit"
        onClick={handleSignIn}
        class="rounded bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-300"
      >
        Sign in
      </button>

      <Show when={error()}>
        <p>{error()}</p>
      </Show>
    </form>
  );
};
