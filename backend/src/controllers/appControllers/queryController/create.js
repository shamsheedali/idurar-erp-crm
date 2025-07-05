const mongoose = require('mongoose');

const Model = mongoose.model('Query');

const { increaseBySettingKey } = require('@/middlewares/settings');
const schema = require('./schemaValidate');

const create = async (req, res) => {
  let body = req.body;

  const { error, value } = schema.validate(body);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  body = value;
  body.createdBy = req.admin._id;

  // Create document
  const result = await new Model(body).save();

  // Increase setting value
  await increaseBySettingKey({
    settingKey: 'last_query_number',
  });

  // Return response
  return res.status(200).json({
    success: true,
    result,
    message: 'Query created successfully',
  });
};

module.exports = create;
