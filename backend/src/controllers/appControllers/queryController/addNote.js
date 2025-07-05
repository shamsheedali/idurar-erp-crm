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

  const formattedNotes = notes.map((note) => ({
    noteId: new mongoose.Types.ObjectId(),
    text: note.text,
    createdAt: new Date(),
  }));

  const updatedQuery = await Query.findByIdAndUpdate(
    id,
    { $push: { notes: { $each: formattedNotes } } },
    { new: true }
  );

  if (!updatedQuery) {
    return res.status(404).json({
      success: false,
      message: 'Query not found',
    });
  }

  return res.status(200).json({
    success: true,
    result: updatedQuery,
    message: 'Notes added successfully',
  });
};

module.exports = addNote;
