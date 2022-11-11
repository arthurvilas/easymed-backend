const { Router } = require('express');
const ExamsController = require('../controllers/ExamsController');

const examsController = new ExamsController();
const examsRoutes = Router();

examsRoutes.get('/:idPatient', examsController.getExams);
examsRoutes
  .route('/')
  .post(examsController.createExam)
  .patch(examsController.updateExam)
  .delete(examsController.deleteExam);

module.exports = examsRoutes;
