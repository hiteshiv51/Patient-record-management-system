const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  diagnosis: String,
  prescription: String,
  notes: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
