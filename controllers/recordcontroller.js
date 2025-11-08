const Record = require('../models/Record');
const Patient = require('../models/Patient');

exports.addRecord = async (req, res, next) => {
  try {
    const { patientId, diagnosis, prescription, notes } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const record = await Record.create({
      patientId,
      doctorId: req.user.id,
      diagnosis,
      prescription,
      notes
    });

    res.status(201).json({ message: 'Record added', record });
  } catch (err) {
    next(err);
  }
};

exports.getRecordsByPatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const records = await Record.find({ patientId }).sort({ date: -1 }).populate('doctorId', 'name email role');
    res.json(records);
  } catch (err) {
    next(err);
  }
};
