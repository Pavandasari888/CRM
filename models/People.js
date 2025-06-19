const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('People', peopleSchema);
