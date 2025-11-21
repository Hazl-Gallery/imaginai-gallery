import express from 'express';
import { GoogleGenAI, Modality } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const IMAGES_DIR = path.join(__dirname, 'generated-images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY });

app.use(express.json());
app.use(express.static('dist'));
app.use('/images', express.static(IMAGES_DIR));

// Load existing images metadata
const METADATA_FILE = path.join(IMAGES_DIR, 'metadata.json');
let imagesMetadata: any[] = [];

if (fs.existsSync(METADATA_FILE)) {
  try {
    const data = fs.readFileSync(METADATA_FILE, 'utf-8');
    imagesMetadata = JSON.parse(data);
  } catch (err) {
    console.error('Failed to load metadata:', err);
  }
}

const saveMetadata = () => {
  try {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(imagesMetadata, null, 2));
  } catch (err) {
    console.error('Failed to save metadata:', err);
  }
};

// API endpoint to generate image
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image for prompt:', prompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];

    if (!part || !part.inlineData || !part.inlineData.data) {
      throw new Error('No image data returned from Gemini API');
    }

    const base64ImageBytes = part.inlineData.data;
    const mimeType = part.inlineData.mimeType || 'image/png';
    const extension = mimeType.split('/')[1] || 'png';

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}.${extension}`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Save image to disk
    const buffer = Buffer.from(base64ImageBytes, 'base64');
    fs.writeFileSync(filepath, buffer);

    // Create metadata entry
    const imageMetadata = {
      id: timestamp.toString(),
      filename,
      url: `/images/${filename}`,
      prompt,
      createdAt: timestamp,
    };

    imagesMetadata.unshift(imageMetadata);
    saveMetadata();

    console.log('Image saved:', filename);

    res.json(imageMetadata);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// API endpoint to get all images
app.get('/api/images', (req, res) => {
  res.json(imagesMetadata);
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Images directory: ${IMAGES_DIR}`);
});
