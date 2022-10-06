const { Router } = require('express');
const PatientController = require('../controllers/PatientController');

const patientController = new PatientController();

const medicationsRouter = require('./medications.routes');
const conditionRouter = require('./conditions.routes');
const allergiesRouter = require('./allergies.routes');

const patientRouter = Router();

patientRouter.use('/medications', medicationsRouter);
patientRouter.use('/conditions', conditionRouter);
patientRouter.use('/allergies', allergiesRouter);

patientRouter.get('/:idPatient', patientController.getPatient);
patientRouter.patch('/:idPatient', patientController.updatePatient);
patientRouter.post('/signup', patientController.createPatient);

module.exports = patientRouter;
