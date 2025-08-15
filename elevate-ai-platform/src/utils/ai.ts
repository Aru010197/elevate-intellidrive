import { createClient } from '@vercel/ai-sdk';

const client = createClient({
  apiKey: process.env.VERCEL_AI_API_KEY,
});

export const fetchInvestmentInsights = async (query: string) => {
  try {
    const response = await client.query({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching investment insights:', error);
    throw new Error('Failed to fetch insights');
  }
};