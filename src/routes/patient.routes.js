const { Router } = require('express');
const PatientController = require('../controllers/PatientController');

const patientController = new PatientController();

const patientRouter = Router();

patientRouter.post('/login');
patientRouter.post('/signin', patientController.create);

module.exports = patientRouter;
