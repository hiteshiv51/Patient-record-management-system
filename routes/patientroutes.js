const express = require('express');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

const router = express.Router();

// All patient routes require authentication
router.use(auth);

router.post('/', authorizeRoles(['admin','doctor','nurse']), createPatient);
router.get('/', authorizeRoles(['admin','doctor','nurse']), getPatients);
router.get('/:id', authorizeRoles(['admin','doctor','nurse']), getPatientById);
router.put('/:id', authorizeRoles(['admin','doctor']), updatePatient);
router.delete('/:id', authorizeRoles(['admin']), deletePatient);

module.exports = router;
