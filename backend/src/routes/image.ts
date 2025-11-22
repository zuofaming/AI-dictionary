import express from 'express';
import { openAIService } from '../services/openai.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { concept, language } = req.body;

    if (!concept) {
      return res.status(400).json({
        error: 'Missing required field: concept',
      });
    }

    const imageUrl = await openAIService.generateImage(concept);

    res.json({
      imageUrl,
      concept,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    res.status(500).json({
      error: 'Failed to generate image',
      message: error.message,
    });
  }
});

export default router;
