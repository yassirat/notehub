import { Navigate } from "@solidjs/router";
import { Show } from "solid-js";
import { useAuth } from "../context/sign-context";
import { SpinnerLoading } from "./loading";

export default function PrivateRoute(props: any) {
  const { user, loading } = useAuth();

  return (
    <>
      <Show when={loading()}>
        <SpinnerLoading />
      </Show>
      <Show when={!loading()}>
        <Show when={user()} fallback={<Navigate href="/register" />}>
          {props.children}
        </Show>
      </Show>
    </>
  );
}
