const { Router } = require('express');

const patientsResourcesRouter = Router();

patientsResourcesRouter.use('/conditions');

module.exports = patientsResourcesRouter;
