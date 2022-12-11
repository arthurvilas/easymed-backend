const ROLE_PATIENT = 'patient';
const ROLE_DOCTOR = 'doctor';
const { Router } = require('express');
const authMiddleware = require('../../utils/authMiddleware');
const roleMiddleware = require('../../utils/roleMiddleware');
const {
  listAllergies,
  getPatientAllergies,
  createPatientAllergy,
  deletePatientAllergy,
} = require('../controllers/AllergiesController');
const auth = require('../controllers/AuthController');
const {
  listConditions,
  getPatientConditions,
  createPatientCondition,
  updatePatientCondition,
  deletePatientCondition,
} = require('../controllers/ConditionsController');
const {
  getPatientDiagnosis,
  createPatientDiagnosis,
  deleteDiagnosisExam,
} = require('../controllers/DiagnosesController');
const {
  getPatientExams,
  createPatientExam,
  updatePatientExam,
  deletePatientExam,
} = require('../controllers/ExamsController');
const login = require('../controllers/LoginController');
const {
  listMedications,
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
} = require('../controllers/MedicationsController');
const {
  listPatients,
  updatePatient,
  getPatient,
  createPatient,
} = require('../controllers/PatientsController');

const router = Router();
router.post('/auth', auth);
router.post('/login', login);
router.post('/patients', createPatient);

router.use(authMiddleware);

// Patients
router.get('/patients', listPatients);
router.patch('/patients/:idPatient', updatePatient); // PATIENT
router.get('/patients/:idPatient', roleMiddleware(ROLE_PATIENT), getPatient);

// Allergies
router.get('/patients/:idPatient/allergies', getPatientAllergies);
router.get('/allergies', listAllergies);
router.post('/patients/:idPatient/allergies/:idAllergy', createPatientAllergy);
router.delete(
  '/patients/:idPatient/allergies/:idAllergy',
  deletePatientAllergy
);

// Conditions
router.get('/conditions', listConditions);
router.get(
  '/patients/:idPatient/conditions',
  roleMiddleware(),
  getPatientConditions
);
router.post('/patients/:idPatient/conditions', createPatientCondition); // DOCTOR
router.patch('/patients/conditions/:idRelation', updatePatientCondition); // DOCTOR
router.delete('/patients/conditions/:idRelation', deletePatientCondition); // DOCTOR

// Medications
router.get('/medications', listMedications);
router.get('/patients/:idPatients/medications', getMedications);
router.post('/patients/:idPatients/medications', createMedication); // DOCTOR
router.patch('/patients/medications/:idRelation', updateMedication); // DOCTOR
router.patch('/patients/medications/:idRelation', deleteMedication); // DOCTOR

// Diagnoses
router.get('/patients/:idPatient/diagnoses', getPatientDiagnosis);
router.post('/patients/:idPatient/diagnoses', createPatientDiagnosis); // DOCTOR
router.patch('/diagnoses/:idDiagnosis', createPatientDiagnosis); // DOCTOR
router.delete('/diagnoses/:idDiagnosis', deleteDiagnosisExam); // DOCTOR

// Exams
router.get('/patients/:idPatient/exams', getPatientExams);
router.post('/patients/:idPatient/exams', createPatientExam);
router.patch('/patients/exams/idExam', updatePatientExam);
router.delete('/exams/:idExam', deletePatientExam);

module.exports = router;
