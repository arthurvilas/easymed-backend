const { Router } = require('express');
const DoctorsController = require('../controllers/DoctorsController');
const doctorsController = new DoctorsController();

const doctorsRouter = Router();

doctorsRouter
  .route('/:idDoctor')
  .get(doctorsController.getDoctor)
  .patch(doctorsController.updateDoctor);

doctorsRouter.post('/signup', doctorsController.createDoctor);

module.exports = doctorsRouter;
