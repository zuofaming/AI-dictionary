import express from 'express';
import { openAIService } from '../services/openai.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { wordId, message, conversationHistory, targetLanguage, nativeLanguage } = req.body;

    if (!message || !targetLanguage || !nativeLanguage) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['message', 'targetLanguage', 'nativeLanguage'],
      });
    }

    // Get the word from conversation history or use a default
    const word = conversationHistory?.[0]?.content?.match(/"([^"]+)"/)?.[1] || 'this word';

    const response = await openAIService.chat(message, conversationHistory || [], {
      word,
      targetLanguage,
      nativeLanguage,
    });

    res.json({
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: error.message,
    });
  }
});

export default router;
