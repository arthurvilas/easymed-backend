const { Router } = require('express');
const patientRouter = require('./patient.routes');
const loginController = require('../controllers/LoginController');
const router = Router();

router.use('/patients', patientRouter);
router.post('/login', loginController);

module.exports = router;
