const genAI = require('@/config/geminiConfig');
const mongoose = require('mongoose');
const Model = mongoose.model('Invoice');

const summarizeNotes = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Invoice ID provided.',
    });
  }

  try {
    const invoice = await Model.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found.',
      });
    }

    const allItemNotes = [];
    if (invoice.items && Array.isArray(invoice.items)) {
      invoice.items.forEach((item) => {
        if (item.note && Array.isArray(item.note) && item.note.length > 0) {
          allItemNotes.push(...item.note);
        }
      });
    }

    let summaryText = '';

    if (allItemNotes.length === 0) {
      summaryText = 'No notes available for this invoice.';
      invoice.summary = summaryText;
      await invoice.save();

      return res.status(200).json({
        success: true,
        summary: summaryText,
        invoiceId: invoice._id,
        message: 'No notes found, saved default summary.',
      });
    }

    const formattedNotesForGemini = allItemNotes
      .map((note, index) => `${index + 1}. ${note}`)
      .join('\n');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt =
      `Generate a comprehensive summary for an invoice based on the following collection of individual item notes. ` +
      `The summary should be concise, professional, and capture the overall context, key details, and important instructions from all notes combined. ` +
      `Focus on the most salient points relevant to the entire invoice.\n\n`;
    prompt += `\nCollected Item Notes:\n`;
    prompt += formattedNotesForGemini;
    prompt += `\n\nProvide a summary for this invoice:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    summaryText = response.text();

    invoice.summary = summaryText;
    await invoice.save();

    res.status(200).json({
      success: true,
      summary: summaryText,
      invoiceId: invoice._id,
      message: 'Invoice notes summary generated and saved successfully.',
    });
  } catch (error) {
    console.error('Error calling Gemini API for invoice summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate invoice summary. An internal server error occurred.',
      error: error.message,
    });
  }
};

module.exports = summarizeNotes;
