const { Router } = require('express');
const patientRouter = require('./patient.routes');
const loginController = require('../controllers/LoginController');
const doctorsRouter = require('./doctors.routes');
const router = Router();

router.use('/patients', patientRouter);
router.use('/doctors', doctorsRouter);
router.post('/login', loginController);

module.exports = router;
