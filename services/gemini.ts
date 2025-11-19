import { GoogleGenAI, Modality } from "@google/genai";

// Initialize the Gemini client
// Note: In a real production app, handle API keys securely on a backend.
// Here we assume it is injected via environment variable as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image using the 'nano banana' (gemini-2.5-flash-image) model.
 * @param prompt The text description for the image.
 * @returns The Base64 data URL of the generated image.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract the image data from the response
    const part = response.candidates?.[0]?.content?.parts?.[0];
    
    if (part && part.inlineData && part.inlineData.data) {
      const base64ImageBytes = part.inlineData.data;
      const mimeType = part.inlineData.mimeType || 'image/png';
      return `data:${mimeType};base64,${base64ImageBytes}`;
    }

    throw new Error("No image data returned from Gemini API.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
