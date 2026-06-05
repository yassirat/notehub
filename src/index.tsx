/* @refresh reload */
import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

import { Toaster } from 'solid-sonner';
import CreateNote from './pages/create-note';
import NotFound from './pages/not-found';
import NotePage from './pages/note-page';

render(
  () => (
    <>
      <Router>
        <Route path="/" component={App} />
        <Route path="/create" component={CreateNote} />
        <Route path="/notes/:id" component={NotePage} />
        <Route path="*" component={NotFound} />
      </Router>
      <Toaster richColors />
    </>
  ),
  document.getElementById('root')!,
);
