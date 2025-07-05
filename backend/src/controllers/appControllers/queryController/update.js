
const mongoose = require('mongoose');

const Model = mongoose.model('Query');

const { calculate } = require('@/helpers');
const schema = require('./schemaValidate');

const update = async (req, res) => {
  let body = req.body;

};

module.exports = update;
