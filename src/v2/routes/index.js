const { Router } = require('express');
const patientsRouter = require('./patients.routes');
const patientsResourcesRouter = require('./patientsResources.routes');

const router = Router();

router.use('/patients/:idPatient', patientsResourcesRouter);
router.use('/patients', patientsRouter);
