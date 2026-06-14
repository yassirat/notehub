import { useNavigate } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import { useAuth } from '../context/sign-context';
import type { ShowFormProps } from '../pages/register-page';
import Loading from './loading';

export const SignUp = (props: ShowFormProps) => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signUp({ email: email(), password: password() });

      if (result) {
        navigate('/');
      }
    } catch (err) {
      setError(`${err}: error occured`);
    } finally {
      <Loading />;
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
        class="border-neutral-700 border rounded-sm py-2 px-2 focus:outline-none text-sm font-medium w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="border-neutral-700 border rounded-sm py-2 px-2 focus:outline-none text-sm font-medium w-full"
      />
      <p class="text-sm">
        Already have an account?{' '}
        <span
          class=" text-neutral-400 font-semibold cursor-pointer hover:underline"
          onClick={() => props.showForm()}>
          Sign in
        </span>
      </p>
      <button
        type="submit"
        class="bg-neutral-200 text-neutral-900 text-sm uppercase py-2 px-4 rounded transition-colors duration-300 hover:bg-neutral-300">
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

  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signIn({ email: email(), password: password() });

      if (result) {
        navigate('/');
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
        class="border-neutral-700 border rounded-sm py-2 px-2 focus:outline-none text-sm font-medium w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="border-neutral-700 border rounded-sm py-2 px-2 focus:outline-none text-sm font-medium w-full"
      />
      <p class="text-sm">
        No account yet?{' '}
        <span
          class=" text-neutral-700 font-semibold cursor-pointer hover:underline"
          onClick={props.showForm}>
          Create one
        </span>
      </p>
      <button
        type="submit"
        onClick={handleSignIn}
        class="bg-neutral-200 text-neutral-900 text-sm uppercase py-2 px-4 font-medium rounded transition-colors duration-300 hover:bg-neutral-300">
        Sign in
      </button>

      <Show when={error()}>
        <p>{error()}</p>
      </Show>
    </form>
  );
};
