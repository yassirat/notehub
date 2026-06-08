/* @refresh reload */
import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

import { Toaster } from 'solid-sonner';
import About from './pages/about';
import CreateNote from './pages/create-note';
import NotFound from './pages/not-found';
import NotePage from './pages/note-page';

render(
  () => (
    <>
      <Router>
        <Route path="/" component={App} />
        <Route path="/create" component={CreateNote} />
        <Route path="/about" component={About} />
        <Route path="/notes/:id" component={NotePage} />
        <Route path="*" component={NotFound} />
      </Router>
      <Toaster richColors />
    </>
  ),
  document.getElementById('root')!,
);
