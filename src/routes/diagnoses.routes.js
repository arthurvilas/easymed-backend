const { Router } = require('express');
const DiagnosesController = require('../controllers/DiagnosesController');

const diagnosesController  = new DiagnosesController();
const diagnosesRouter = Router();

diagnosesRouter.get('/:idPatient', diagnosesController.getDiagnosis);
diagnosesRouter.post('/', diagnosesController.createDiagnosis);
diagnosesRouter.patch('/', diagnosesController.updateDiagnoses);
diagnosesRouter.delete('/', diagnosesController.deleteDiagnosisExam);

module.exports = diagnosesRouter;