export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface WordEntry {
  id: string;
  word: string;
  targetLanguage: string;
  nativeLanguage: string;
  explanation: string;
  examples: Example[];
  usage: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface Example {
  text: string;
  translation: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Flashcard {
  id: string;
  wordEntry: WordEntry;
  isFlipped: boolean;
}

export interface Notebook {
  id: string;
  entries: WordEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  id: string;
  content: string;
  words: string[];
  createdAt: Date;
}
