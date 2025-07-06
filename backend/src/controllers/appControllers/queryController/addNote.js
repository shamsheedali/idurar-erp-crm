const mongoose = require('mongoose');
const Query = mongoose.model('Query');

const addNote = async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  if (!Array.isArray(notes) || notes.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Notes array is required',
    });
  }

  const seen = new Set();
  const uniqueNotes = [];
  const skippedInternally = [];

  for (const note of notes) {
    const normalizedText = note.text?.trim().toLowerCase();
    if (!normalizedText || seen.has(normalizedText)) {
      skippedInternally.push(note.text);
      continue;
    }
    seen.add(normalizedText);
    uniqueNotes.push(note);
  }

  const query = await Query.findById(id);
  if (!query) {
    return res.status(404).json({
      success: false,
      message: 'Query not found',
    });
  }

  const existingTexts = new Set(query.notes.map((note) => note.text?.trim().toLowerCase()));

  const formattedNotes = [];
  const skippedDb = [];

  for (const note of uniqueNotes) {
    const normalizedText = note.text.trim().toLowerCase();
    if (existingTexts.has(normalizedText)) {
      skippedDb.push(note.text);
      continue;
    }
    formattedNotes.push({
      noteId: new mongoose.Types.ObjectId(),
      text: note.text,
      createdAt: new Date(),
    });
  }

  let updatedQuery = query;
  if (formattedNotes.length > 0) {
    updatedQuery = await Query.findByIdAndUpdate(
      id,
      { $push: { notes: { $each: formattedNotes } } },
      { new: true }
    );
  }

  const skipped = [...skippedInternally, ...skippedDb];

  return res.status(200).json({
    success: true,
    result: updatedQuery,
    message:
      skipped.length > 0
        ? `Some notes were skipped (duplicates): ${skipped.join(', ')}`
        : 'Notes added successfully',
  });
};

module.exports = addNote;
