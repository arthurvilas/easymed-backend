const { Router } = require('express');
const PatientController = require('../controllers/PatientController');

const patientController = new PatientController();

const patientRouter = Router();

patientRouter.get('/allergies/:idPatient', patientController.getAllergies);
patientRouter.post('/allergies/:idPatient', patientController.createAllergy);
patientRouter.post('/signup', patientController.create);

module.exports = patientRouter;
