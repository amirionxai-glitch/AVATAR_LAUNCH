
const API_KEY = 'AIzaSyAMbuZ9ybl_iW010X_gSm4elu9Qzp1ltSI';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict';

/**
 * Generates an image based on the provided prompt using the NanoBanana Pro API (Google Imagen).
 * @param {string} prompt - The text description for the image.
 * @returns {Promise<string>} - A promise that resolves to the base64 image string.
 */
export const generateImage = async (prompt) => {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                instances: [
                    {
                        prompt: prompt,
                    },
                ],
                parameters: {
                    sampleCount: 1,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // The response structure for Imagen on Vertex AI / Gemini API typically returns base64 bytes
        // Adjusting based on standard Google Cloud AI response format
        if (data.predictions && data.predictions.length > 0) {
            return data.predictions[0].bytesBase64Encoded;
        } else {
            throw new Error('No image data received');
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
