import { createSignal, Match, Switch } from 'solid-js';
import { SignIn, SignUp } from '../components/register-form';

export interface ShowFormProps {
  showForm: () => void;
}

export default function RegisterPage() {
  const [isSignUp, setIsSignUp] = createSignal(true);

  const toggleForm = () => setIsSignUp(!isSignUp());

  return (
    <main class="dark:bg-neutral-950 dark:text-white min-h-dvh w-full place-content-center font-main">
      <article class="max-w-sm mx-auto px-4">
        <Switch>
          <Match when={isSignUp()}>
            <SignUp showForm={toggleForm} />
          </Match>
          <Match when={!isSignUp()}>
            <SignIn showForm={toggleForm} />
          </Match>
        </Switch>
      </article>
    </main>
  );
}
