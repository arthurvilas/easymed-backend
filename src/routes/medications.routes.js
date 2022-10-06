const { Router } = require('express');
const MedicationsController = require('../controllers/MedicationsController');

const medicationsController = new MedicationsController();
const medicationsRouter = Router();

medicationsRouter.patch('/', medicationsController.updateMedication);
medicationsRouter.delete('/', medicationsController.deleteMedication);
medicationsRouter.get('/list', medicationsController.listMedications);
medicationsRouter.get('/:idPatient', medicationsController.getMedications);
medicationsRouter.post('/:idPatient', medicationsController.createMedication);

module.exports = medicationsRouter;
