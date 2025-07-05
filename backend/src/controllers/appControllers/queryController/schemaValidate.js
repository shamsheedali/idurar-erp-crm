const Joi = require('joi');

const schema = Joi.object({
  client: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  number: Joi.number().required(),
  status: Joi.string().valid('Open', 'Inprogress', 'Closed').required(),
  description: Joi.string().allow('').optional(),
  resolution: Joi.string().allow('').optional(),
  created: Joi.date().default(Date.now),

  notes: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        createdAt: Joi.date().optional(),
      })
    )
    .optional(),
});

module.exports = schema;
