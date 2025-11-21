import { GeneratedImage } from '../types';

/**
 * Generates an image via backend API
 * @param prompt The text description for the image.
 * @returns The generated image metadata
 */
export const generateImageFromPrompt = async (prompt: string): Promise<GeneratedImage> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

/**
 * Fetches all previously generated images
 * @returns Array of generated images
 */
export const fetchImages = async (): Promise<GeneratedImage[]> => {
  try {
    const response = await fetch('/api/images');
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
