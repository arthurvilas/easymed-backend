const { Router } = require('express');
const DoctorsController = require('../controllers/DoctorsController');
const doctorsController = new DoctorsController();

const doctorsRouter = Router();

doctorsRouter.get('/:idDoctor', doctorsController.getDoctor);
doctorsRouter.post('/signup', doctorsController.createDoctor);
doctorsRouter.patch('/:idDoctor', doctorsController.updateDoctor);

module.exports = doctorsRouter;
