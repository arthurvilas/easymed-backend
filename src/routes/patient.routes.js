const { Router } = require('express');
const PatientController = require('../controllers/PatientController');

const patientController = new PatientController();

const patientRouter = Router();

patientRouter.post('/signup', patientController.create);

patientRouter.get('/conditions/:idPatient', patientController.getConditions);

patientRouter.get('/allergies/:idPatient', patientController.getAllergies);
patientRouter.post('/allergies/:idPatient', patientController.createAllergy);
patientRouter.delete('/allergies/:idPatient', patientController.deleteAllergy);

module.exports = patientRouter;
