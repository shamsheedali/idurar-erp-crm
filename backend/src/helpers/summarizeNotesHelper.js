const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function summarizeNotesHelper(notes) {
  try {
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-1.5-pro-latest',
    });

    const prompt = `Summarize the following invoice item notes clearly and concisely:\n\n${notes.join(
      '\n'
    )}`;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const summary = result.response.text();
    return summary;
  } catch (error) {
    console.error('Gemini Summary Error:', JSON.stringify(error, null, 2));
    return '';
  }
}

module.exports = summarizeNotesHelper;
