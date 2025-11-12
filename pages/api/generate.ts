
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title } = req.body;

    const prompt = `Generate a <meta> tag, Schema.org JSON-LD, and image metadata (IPTC/XMP style) for a fashion product. Product title: "${title}". Keep it concise, high-fashion, and SEO-optimized.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ output: result });
  } catch (error: any) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ error: 'Failed to generate metadata.' });
  }
}
