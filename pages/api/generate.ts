
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const title = req.body.title?.trim() || 'this fashion product';

    const prompt = `
You are a fashion metadata generator assistant for SEO, e-commerce, and CMS platforms.

Given the product title: "${title}", generate the following:

1. A <meta> HTML tag (SEO-optimized, under 160 characters)
2. Schema.org JSON-LD for @type: Product (include name, description, brand only)
3. IPTC/XMP image metadata (Title, Description, Keywords: 5–10)

Use a refined, high-fashion tone. Do NOT include price or availability.
Respond only with plain formatted text as if filling the fields directly.

Return the outputs under clearly marked sections like:
<meta> tag:
Schema.org JSON-LD:
Image Metadata (IPTC/XMP style):
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ output: result });
  } catch (error: any) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ error: 'Failed to generate metadata.' });
  }
}
