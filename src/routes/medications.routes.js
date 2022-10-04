const { Router } = require('express');
const MedicationsController = require('../controllers/MedicationsController');

const medicationsController = new MedicationsController();
const medicationsRouter = Router();

medicationsRouter.get('/list', medicationsController.listMedications);
medicationsRouter
  .route('/:idPatient')
  .get(medicationsController.getMedications)
  .post(medicationsController.createMedication)
  .patch(medicationsController.updateMedication)
  .delete(medicationsController.deleteMedication);

module.exports = medicationsRouter;
