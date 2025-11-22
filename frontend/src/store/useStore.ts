import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordEntry, Notebook, Story } from '../types';

interface AppState {
  // Language settings
  nativeLanguage: string;
  targetLanguage: string;
  setNativeLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;

  // Current word entry
  currentEntry: WordEntry | null;
  setCurrentEntry: (entry: WordEntry | null) => void;

  // Notebook
  notebook: WordEntry[];
  addToNotebook: (entry: WordEntry) => void;
  removeFromNotebook: (id: string) => void;
  isInNotebook: (id: string) => boolean;

  // Stories
  stories: Story[];
  addStory: (story: Story) => void;

  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language settings
      nativeLanguage: '',
      targetLanguage: '',
      setNativeLanguage: (lang) => set({ nativeLanguage: lang }),
      setTargetLanguage: (lang) => set({ targetLanguage: lang }),

      // Current word entry
      currentEntry: null,
      setCurrentEntry: (entry) => set({ currentEntry: entry }),

      // Notebook
      notebook: [],
      addToNotebook: (entry) => {
        const { notebook } = get();
        if (!notebook.find(e => e.id === entry.id)) {
          set({ notebook: [...notebook, entry] });
        }
      },
      removeFromNotebook: (id) => {
        const { notebook } = get();
        set({ notebook: notebook.filter(e => e.id !== id) });
      },
      isInNotebook: (id) => {
        const { notebook } = get();
        return notebook.some(e => e.id === id);
      },

      // Stories
      stories: [],
      addStory: (story) => {
        const { stories } = get();
        set({ stories: [...stories, story] });
      },

      // UI state
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'ai-dictionary-storage',
    }
  )
);
