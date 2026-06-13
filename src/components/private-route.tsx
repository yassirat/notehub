import { Navigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { useAuth } from '../context/sign-context';

export default function PrivateRoute(props: any) {
  const { user, loading } = useAuth();

  return (
    <>
      <Show when={loading()}>
        <div class="flex items-center justify-center min-h-dvh">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Show>
      <Show when={!loading()}>
        <Show when={user()} fallback={<Navigate href="/register" />}>
          {props.children}
        </Show>
      </Show>
    </>
  );
}
