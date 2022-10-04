const { Router } = require('express');
const AllergiesController = require('../controllers/AllergiesController');

const allergiesController = new AllergiesController();
const allergiesRoutes = Router();

allergiesRoutes.get('/list', allergiesController.listAllergies);
allergiesRoutes
  .route('/:idPatient')
  .get(allergiesController.getAllergies)
  .post(allergiesController.createAllergy)
  .delete(allergiesController.deleteAllergy);

module.exports = allergiesRoutes;
