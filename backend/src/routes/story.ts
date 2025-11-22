import express from 'express';
import { openAIService } from '../services/openai.service.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { words, targetLanguage, nativeLanguage } = req.body;

    if (!words || !Array.isArray(words) || words.length === 0) {
      return res.status(400).json({
        error: 'Missing or invalid words array',
      });
    }

    if (!targetLanguage || !nativeLanguage) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['words', 'targetLanguage', 'nativeLanguage'],
      });
    }

    const storyContent = await openAIService.generateStory(
      words,
      targetLanguage,
      nativeLanguage
    );

    const response = {
      id: uuidv4(),
      content: storyContent,
      words,
      createdAt: new Date().toISOString(),
    };

    res.json(response);
  } catch (error: any) {
    console.error('Story generation error:', error);
    res.status(500).json({
      error: 'Failed to generate story',
      message: error.message,
    });
  }
});

export default router;
