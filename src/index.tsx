/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";
import { SignContextProvider } from "./context/sign-context";
import "./index.css";
import CreateNote from "./pages/create-note";
import NotFound from "./pages/not-found";
import NotePage from "./pages/note-page";

import { Toaster } from "solid-sonner";
import PrivateRoute from "./components/private-route";
import { NotesProvider } from "./context/note-context";
import RegisterPage from "./pages/register-page";
import UserProfile from "./pages/user-profile";

render(
  () => (
    <SignContextProvider>
      <NotesProvider>
        <Router>
          <Route
            path="/"
            component={() => (
              <PrivateRoute>
                <App />
              </PrivateRoute>
            )}
          />
          <Route path="/register" component={RegisterPage} />
          <Route path="/user" component={UserProfile} />
          <Route path="/create" component={CreateNote} />
          <Route path="/notes/:id" component={NotePage} />
          <Route path="*" component={NotFound} />
        </Router>
        <Toaster richColors />
      </NotesProvider>
    </SignContextProvider>
  ),
  document.getElementById("root")!,
);
