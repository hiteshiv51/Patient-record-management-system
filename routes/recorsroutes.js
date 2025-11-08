const express = require('express');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  addRecord,
  getRecordsByPatient
} = require('../controllers/recordController');

const router = express.Router();

router.use(auth);

router.post('/', authorizeRoles(['doctor','admin']), addRecord);
router.get('/patient/:patientId', authorizeRoles(['doctor','nurse','admin']), getRecordsByPatient);

module.exports = router;
