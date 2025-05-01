
/**
 * Service for interacting with the Gemini API
 */

// Default API key that will be used if no user-provided key exists
const DEFAULT_API_KEY = 'AIzaSyCejEPLiD5HEtnWqLl0rGBSIL89NNFKjGk';

// This would typically be stored securely in environment variables or through a backend
let apiKey: string | null = DEFAULT_API_KEY;

export const setApiKey = (key: string) => {
  apiKey = key;
};

export const getApiKey = () => {
  return apiKey;
};

export const resetApiKeyToDefault = () => {
  apiKey = DEFAULT_API_KEY;
};

export const isUsingDefaultApiKey = () => {
  return apiKey === DEFAULT_API_KEY;
};

export const humanizeTextWithGemini = async (text: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key not set. Please set your Gemini API key first.');
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Please rewrite the following text to make it sound more natural and human-like. 
                Improve its flow, vary sentence structure, use more natural language patterns, and maintain the original meaning:
                
                "${text}"
                
                Only respond with the rewritten text, no explanations or additional comments.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the humanized text from the response
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error('Unexpected response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
