
const mongoose = require('mongoose');

const Model = mongoose.model('Query');

const schema = require('./schemaValidate');

const update = async (req, res) => {
  let body = req.body;
  const { error, value } = schema.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      result: null,
      message: error.details[0]?.message,
    });
  }

  const result = await Model.findOneAndUpdate(
    { _id: req.params.id, removed: false },
    value,
    { new: true }
  ).exec();

  return res.status(200).json({
    success: true,
    result,
    message: 'Query updated successfully',
  });
};

module.exports = update;
