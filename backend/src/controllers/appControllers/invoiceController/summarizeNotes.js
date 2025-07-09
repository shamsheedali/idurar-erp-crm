const summarizeNotesHelper = require('@/helpers/summarizeNotesHelper');

const summarizeNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!Array.isArray(notes)) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'notes must be an array of strings',
      });
    }

    const summary = await summarizeNotesHelper(notes);

    return res.status(200).json({
      success: true,
      result: summary,
      message: 'Summary generated successfully',
    });
  } catch (err) {
    console.error('Gemini Summary Error:', err);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Failed to generate summary',
    });
  }
};

module.exports = summarizeNotes;
