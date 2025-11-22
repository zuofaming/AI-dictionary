import express from 'express';
import { openAIService } from '../services/openai.service.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, targetLanguage, nativeLanguage } = req.body;

    if (!text || !targetLanguage || !nativeLanguage) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['text', 'targetLanguage', 'nativeLanguage'],
      });
    }

    // Get word explanation from OpenAI
    const wordData = await openAIService.lookupWord({
      text,
      targetLanguage,
      nativeLanguage,
    });

    // Generate image for the concept
    let imageUrl: string | undefined;
    try {
      imageUrl = await openAIService.generateImage(wordData.word);
    } catch (error) {
      console.error('Image generation failed:', error);
      // Continue without image
    }

    const response = {
      id: uuidv4(),
      word: wordData.word,
      targetLanguage,
      nativeLanguage,
      explanation: wordData.explanation,
      examples: wordData.examples,
      usage: wordData.usage,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    res.json(response);
  } catch (error: any) {
    console.error('Lookup error:', error);
    res.status(500).json({
      error: 'Failed to lookup word',
      message: error.message,
    });
  }
});

export default router;
