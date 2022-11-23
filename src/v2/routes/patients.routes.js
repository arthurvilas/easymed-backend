const { Router } = require('express');
const {
  listPatients,
  createPatient,
  updatePatient,
  getPatient,
} = require('../controllers/PatientsController');

const patientsRouter = Router();

patientsRouter.get('/:idPatient', getPatient);
patientsRouter.patch('/:idPatient', updatePatient);

patientsRouter.get('/', listPatients);
patientsRouter.post('/', createPatient);

module.exports = patientsRouter;
