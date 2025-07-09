// At the top of your file (e.g., in your controller file)
require('dotenv').config(); // Make sure this is at the very top of the file
                             // if 'genAI' is being initialized in this file directly
                             // OR if you're importing 'genAI' from a file that uses process.env

// Assuming '@/config/geminiConfig' correctly exports the initialized GoogleGenerativeAI instance
const genAI = require("@/config/geminiConfig");

const summarizeNotes = async (req, res) => {
    const { name, description, note } = req.body;

    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: 'Both item name and description are required for summarization.'
        });
    }

    try {
        // --- Gemini API Call Logic ---
        // Use a known good model for text generation.
        // gemini-1.5-flash is generally faster and cost-effective for summarization.
        // If that doesn't work, try "gemini-1.0-pro".
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // <--- **CRITICAL CHANGE HERE**

        // Construct the prompt for Gemini.
        let prompt = `Summarize the following details concisely and professionally:\n\n`;
        prompt += `Item Name: ${name}\n`;
        prompt += `Description: ${description}\n`;
        if (note) { // Only add the note if it exists
            prompt += `Additional Note: ${note}\n`;
        }
        prompt += `\nThe summary should be brief, easy to understand, and capture the main points.`;

        // Make the API call to Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summaryText = response.text(); // Get the plain text summary

        // --- Send Response Back to Frontend ---
        res.status(200).json({
            success: true,
            summary: summaryText,
            message: 'Summary generated successfully.'
        });
    } catch (error) {
        console.error('Error calling Gemini API for summarization:', error);
        // Provide a more user-friendly error message for the frontend
        res.status(500).json({
            success: false,
            message: 'Failed to generate summary. Please ensure your API key is valid and try again.',
            error: error.message // Optionally send error message for debugging
        });
    }
};

module.exports = summarizeNotes;