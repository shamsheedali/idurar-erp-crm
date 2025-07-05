const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['Open', 'Inprogress', 'Closed'],
    default: 'open',
  },

  resolution: {
    type: String,
    default: '',
  },

  notes: [
    {
      _id: false,
      noteId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  updated: {
    type: Date,
    default: Date.now,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

querySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Query', querySchema);
