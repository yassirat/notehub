import type { Note } from '../types/notes';

const STORAGE_KEY = 'notes';

export function getNotes(): Note[] {
  const notes = localStorage.getItem(STORAGE_KEY);

  return notes ? JSON.parse(notes) : [];
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
