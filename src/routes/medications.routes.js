const { Router } = require('express');
const MedicationsController = require('../controllers/MedicationsController');

const medicationsController = new MedicationsController();
const medicationsRouter = Router();

medicationsRouter.get('/:idPatient', medicationsController.getMedications);
medicationsRouter.post('/:idPatient', medicationsController.createMedication);
medicationsRouter.put('/:idPatient', medicationsController.updateMedication);
medicationsRouter.delete('/:idPatient', medicationsController.deleteMedication);

module.exports = medicationsRouter;
