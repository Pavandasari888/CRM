const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  assigned: { type: Boolean, default: false },
  closed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Lead', leadSchema);
