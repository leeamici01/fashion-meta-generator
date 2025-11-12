
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    output: `<meta name="description" content="Fashion metadata preview. Replace with actual OpenAI integration.">\n\n{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sample Product",
  "description": "This is a placeholder description for schema.org JSON-LD output.",
  "image": "https://cdn.placeholder.com/image.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Placeholder Brand"
  }
}\n\nTitle: Sample Product Image\nDescription: Placeholder IPTC/XMP metadata.\nKeywords: fashion, sample, placeholder, metadata`
  });
}
