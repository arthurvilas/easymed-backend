const { Router } = require('express');
const patientRouter = require('./patient.routes');
const router = Router();

router.use('/patients', patientRouter);

module.exports = router;
