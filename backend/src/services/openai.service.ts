import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface WordLookupRequest {
  text: string;
  targetLanguage: string;
  nativeLanguage: string;
}

export interface WordLookupResponse {
  word: string;
  explanation: string;
  examples: Array<{
    text: string;
    translation: string;
  }>;
  usage: string;
}

export class OpenAIService {
  /**
   * 查询词语并生成详细解释
   */
  async lookupWord(request: WordLookupRequest): Promise<WordLookupResponse> {
    const { text, targetLanguage, nativeLanguage } = request;

    const prompt = `You are a friendly language teacher. A student is learning ${targetLanguage} and their native language is ${nativeLanguage}.

They want to understand: "${text}"

Please provide a response in ${nativeLanguage} with the following structure (use JSON format):

{
  "word": "the word/phrase in ${targetLanguage}",
  "explanation": "A clear, natural explanation of the meaning in ${nativeLanguage}",
  "examples": [
    {
      "text": "Example sentence in ${targetLanguage}",
      "translation": "Translation in ${nativeLanguage}"
    },
    {
      "text": "Another example in ${targetLanguage}",
      "translation": "Translation in ${nativeLanguage}"
    }
  ],
  "usage": "A casual, friendly explanation (in ${nativeLanguage}) covering: cultural context, when to use it, tone/formality, similar words (synonyms or commonly confused words), and key differences. Keep it conversational like chatting with a friend, not like a textbook. Be concise and get straight to the point."
}

Important:
- Keep the explanation natural and easy to understand
- Make the usage section feel like a friend explaining, not a teacher lecturing
- Be concise but informative
- Focus on practical, real-world usage`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful language learning assistant. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const result = JSON.parse(content);
      return result as WordLookupResponse;
    } catch (error) {
      console.error('OpenAI lookup error:', error);
      throw new Error('Failed to lookup word');
    }
  }

  /**
   * 聊天对话
   */
  async chat(
    message: string,
    conversationHistory: Array<{ role: string; content: string }>,
    context: {
      word: string;
      targetLanguage: string;
      nativeLanguage: string;
    }
  ): Promise<string> {
    try {
      const systemPrompt = `You are a friendly language learning assistant. The student is learning about the word "${context.word}" in ${context.targetLanguage}. They speak ${context.nativeLanguage}.

Answer their questions in ${context.nativeLanguage} in a casual, friendly way. Be helpful, encouraging, and make learning fun!`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: messages as any,
        temperature: 0.8,
        max_tokens: 500,
      });

      return completion.choices[0].message.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('OpenAI chat error:', error);
      throw new Error('Failed to send chat message');
    }
  }

  /**
   * 生成故事
   */
  async generateStory(
    words: string[],
    targetLanguage: string,
    nativeLanguage: string
  ): Promise<string> {
    const prompt = `Create a fun, engaging short story in ${targetLanguage} that naturally incorporates ALL of these words: ${words.join(', ')}.

Requirements:
- The story should be 150-250 words
- Make it interesting and memorable to help with learning
- Use natural, conversational language
- Each word should be used in a meaningful context
- After the story in ${targetLanguage}, add a translation in ${nativeLanguage}

Format:
[Story in ${targetLanguage}]

---

[Translation in ${nativeLanguage}]`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a creative language learning assistant who writes engaging stories.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 1000,
      });

      return completion.choices[0].message.content || 'Failed to generate story';
    } catch (error) {
      console.error('OpenAI story generation error:', error);
      throw new Error('Failed to generate story');
    }
  }

  /**
   * 生成图片
   */
  async generateImage(concept: string): Promise<string> {
    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `A clear, simple illustration that visually represents the concept: "${concept}". Style: clean, modern, educational, colorful, suitable for language learning.`,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      });

      return response.data[0].url || '';
    } catch (error) {
      console.error('OpenAI image generation error:', error);
      // Fallback to placeholder if DALL-E fails
      return `https://via.placeholder.com/400x400/667eea/ffffff?text=${encodeURIComponent(concept)}`;
    }
  }
}

export const openAIService = new OpenAIService();
