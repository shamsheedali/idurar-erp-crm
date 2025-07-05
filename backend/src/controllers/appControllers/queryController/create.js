const mongoose = require('mongoose');
const Model = mongoose.model('Query');
const schema = require('./schemaValidate');

const create = async (req, res) => {
  let body = req.body;
  const { error, value } = schema.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      result: null,
      message: error.details[0]?.message,
    });
  }
  value.createdBy = req.admin?._id || null;
  const result = await new Model(value).save();
  return res.status(200).json({
    success: true,
    result,
    message: 'Query created successfully',
  });
};

module.exports = create;