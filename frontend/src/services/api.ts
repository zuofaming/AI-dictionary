import axios from 'axios';
import { WordEntry, ChatMessage, Story } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LookupRequest {
  text: string;
  targetLanguage: string;
  nativeLanguage: string;
}

export interface ChatRequest {
  wordId: string;
  message: string;
  conversationHistory: ChatMessage[];
  targetLanguage: string;
  nativeLanguage: string;
}

export interface StoryRequest {
  words: string[];
  targetLanguage: string;
  nativeLanguage: string;
}

// 查询词语
export const lookupWord = async (request: LookupRequest): Promise<WordEntry> => {
  const response = await api.post('/lookup', request);
  return response.data;
};

// 聊天对话
export const sendChatMessage = async (request: ChatRequest): Promise<string> => {
  const response = await api.post('/chat', request);
  return response.data.message;
};

// 生成故事
export const generateStory = async (request: StoryRequest): Promise<Story> => {
  const response = await api.post('/generate-story', request);
  return response.data;
};

// 生成图片
export const generateImage = async (concept: string, language: string): Promise<string> => {
  const response = await api.post('/generate-image', { concept, language });
  return response.data.imageUrl;
};

export default api;
