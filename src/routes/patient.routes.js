const { Router } = require('express');
const PatientController = require('../controllers/PatientController');

const patientController = new PatientController();

const medicationsRouter = require('./medications.routes');
const conditionRouter = require('./conditions.routes');
const allergiesRouter = require('./allergies.routes');
const diagnosesRouter = require('./diagnoses.routes');
const examsRouter = require('./exams.routes');

const patientRouter = Router();

patientRouter.use('/medications', medicationsRouter);
patientRouter.use('/conditions', conditionRouter);
patientRouter.use('/allergies', allergiesRouter);
patientRouter.use('/diagnoses', diagnosesRouter);
patientRouter.use('/exams', examsRouter);

patientRouter.get('/list', patientController.listPatients);
patientRouter.get('/:idPatient', patientController.getPatient);
patientRouter.patch('/:idPatient', patientController.updatePatient);
patientRouter.post('/signup', patientController.createPatient);

module.exports = patientRouter;
