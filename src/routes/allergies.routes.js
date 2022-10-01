const { Router } = require('express');
const AllergiesController = require('../controllers/AllergiesController');

const allergiesController = new AllergiesController();
const allergiesRoutes = Router();

allergiesRoutes.get('/:idPatient', allergiesController.getAllergies);
allergiesRoutes.post('/:idPatient', allergiesController.createAllergy);
allergiesRoutes.delete('/:idPatient', allergiesController.deleteAllergy);

module.exports = allergiesRoutes;
