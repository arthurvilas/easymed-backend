const { Router } = require('express');
const DoctorsController = require('../controllers/DoctorsController');
const doctorsController = new DoctorsController();

const doctorsRouter = Router();

doctorsRouter.post('/signup', doctorsController.createDoctor);
doctorsRouter
  .route('/:idDoctor')
  .get(doctorsController.getDoctor)
  .patch(doctorsController.updateDoctor);

module.exports = doctorsRouter;
