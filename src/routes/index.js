const { Router } = require('express');
const patientRouter = require('./patient.routes');
const loginController = require('../controllers/LoginController');
const authController = require('../controllers/AuthController');
const doctorsRouter = require('./doctors.routes');
const router = Router();

router.use('/patients', patientRouter);
router.use('/doctors', doctorsRouter);

router.use('/exams', doctorsRouter);
router.use('/doctors', doctorsRouter);
router.post('/login', loginController);
router.post('/auth', authController);

module.exports = router;
