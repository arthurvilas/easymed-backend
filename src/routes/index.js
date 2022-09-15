const { Router } = require('express');
const patientRouter = require('./patient.routes');
const loginController = require('../controllers/loginController');
const router = Router();

router.use('/patients', patientRouter);
router.use('/login', loginController);

module.exports = router;
