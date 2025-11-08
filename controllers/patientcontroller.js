const Patient = require('../models/Patient');

exports.createPatient = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user.id;
    const patient = await Patient.create(payload);
    res.status(201).json({ message: 'Patient created', patient });
  } catch (err) {
    next(err);
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient updated', patient: updated });
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const removed = await Patient.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    next(err);
  }
};
