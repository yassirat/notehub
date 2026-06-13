import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from 'solid-js';
import { supabase } from '../lib/supabase-client';
import type { Note } from '../types/notes';
import { useAuth } from './sign-context';

interface NotesContextType {
  notes: () => Note[];
  loading: () => boolean;
  error: () => string | null;
  createNote: (title: string, description: string) => Promise<void>;
  updateNote: (id: string, title: string, description: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  fetchNotes: () => Promise<void>;
  getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = (props: any) => {
  const { user } = useAuth();

  const [notes, setNotes] = createSignal<Note[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  // Fetch notes from Supabase
  const fetchNotes = async () => {
    if (!user()) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user()?.id)
        .order('updated_at', { ascending: false });

      if (supabaseError) {
        setError(supabaseError.message);
        console.error('Fetch notes error:', supabaseError);
        return;
      }

      setNotes(data || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch notes';
      setError(message);
      console.error('Fetch notes error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create note
  const createNote = async (title: string, description: string) => {
    if (!user()) {
      setError('User not authenticated');
      return;
    }

    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('notes')
        .insert([
          {
            user_id: user()?.id,
            title,
            description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (supabaseError) {
        setError(supabaseError.message);
        console.error('Create note error:', supabaseError);
        return;
      }

      if (data) {
        setNotes([data[0], ...notes()]);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create note';
      setError(message);
      console.error('Create note error:', err);
      throw err;
    }
  };

  // Update note
  const updateNote = async (id: string, title: string, description: string) => {
    if (!user()) {
      setError('User not authenticated');
      return;
    }

    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('notes')
        .update({
          title,
          description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user()?.id)
        .select();

      if (supabaseError) {
        setError(supabaseError.message);
        console.error('Update note error:', supabaseError);
        return;
      }

      if (data) {
        setNotes(notes().map((note) => (note.id === id ? data[0] : note)));
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update note';
      setError(message);
      console.error('Update note error:', err);
      throw err;
    }
  };

  // Delete note
  const deleteNote = async (id: string) => {
    if (!user()) {
      setError('User not authenticated');
      return;
    }

    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .eq('user_id', user()?.id);

      if (supabaseError) {
        setError(supabaseError.message);
        console.error('Delete note error:', supabaseError);
        return;
      }

      setNotes(notes().filter((note) => note.id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete note';
      setError(message);
      console.error('Delete note error:', err);
      throw err;
    }
  };

  // Get note by ID
  const getNoteById = (id: string) => {
    return notes().find((note) => note.id === id);
  };

  // Fetch notes when user changes
  createEffect(() => {
    if (user()) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  });

  const value: NotesContextType = {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    fetchNotes,
    getNoteById,
  };

  return (
    <NotesContext.Provider value={value}>
      {props.children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};
