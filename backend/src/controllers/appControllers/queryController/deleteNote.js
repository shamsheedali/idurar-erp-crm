const mongoose = require('mongoose');
const Query = mongoose.model('Query');

const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;

  const updatedQuery = await Query.findByIdAndUpdate(
    id,
    { $pull: { notes: { noteId: new mongoose.Types.ObjectId(noteId) } } },
    { new: true }
  );

  if (!updatedQuery) {
    return res.status(404).json({
      success: false,
      message: 'Query not found or note not deleted',
    });
  }

  return res.status(200).json({
    success: true,
    result: updatedQuery,
    message: 'Note deleted successfully',
  });
};

module.exports = deleteNote;
