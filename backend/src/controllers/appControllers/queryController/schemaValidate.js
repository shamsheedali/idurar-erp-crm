const Joi = require('joi');

const schema = Joi.object({
  client: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  number: Joi.number().required(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed').required(),
  description: Joi.string().allow(''),
  resolution: Joi.string().allow(''),
  created: Joi.date().default(Date.now),
});

module.exports = schema;
