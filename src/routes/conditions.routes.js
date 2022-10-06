const { Router } = require('express');
const ConditionsController = require('../controllers/ConditionsController');

const conditionsController = new ConditionsController();
const conditionsRouter = Router();

conditionsRouter.get('/list', conditionsController.listConditions);
conditionsRouter.get('/:idPatient', conditionsController.getConditions);
conditionsRouter.post('/:idPatient', conditionsController.createCondition);
conditionsRouter.patch('/', conditionsController.updateCondition);
conditionsRouter.delete('/', conditionsController.deleteCondition);

module.exports = conditionsRouter;
