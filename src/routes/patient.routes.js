const { Router } = require('express');
const PatientController = require('../controllers/PatientController');
const AllergiesController = require('../controllers/AllergiesController');
const ConditionsController = require('../controllers/ConditionsController');
const MedicationsController = require('../controllers/MedicationsController');

const patientController = new PatientController();
const allergiesController = new AllergiesController();
const conditionsController = new ConditionsController();
const medicationsController = new MedicationsController();

const patientRouter = Router();

patientRouter.get('/:idPatient', patientController.getPatient);
patientRouter.post('/signup', patientController.createPatient);

patientRouter.get('/medications/:idPatient', medicationsController.getMedications);
patientRouter.post('/medications/:idPatient', medicationsController.createMedication);
patientRouter.put('/medications/:idPatient', medicationsController.updateMedication);
patientRouter.delete('/medications/:idPatient', medicationsController.deleteMedication);

patientRouter.get('/conditions/:idPatient', conditionsController.getConditions);
patientRouter.post('/conditions/:idPatient', conditionsController.createCondition);
patientRouter.put('/conditions/:idPatient', conditionsController.updateCondition);
patientRouter.delete('/conditions/:idPatient', conditionsController.deleteCondition);

patientRouter.get('/allergies/:idPatient', allergiesController.getAllergies);
patientRouter.post('/allergies/:idPatient', allergiesController.createAllergy);
patientRouter.delete('/allergies/:idPatient', allergiesController.deleteAllergy);

module.exports = patientRouter;
