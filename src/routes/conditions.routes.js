const { Router } = require('express');
const ConditionsController = require('../controllers/ConditionsController');

const conditionsController = new ConditionsController();
const conditionsRouter = Router();

conditionsRouter.get('/:idPatient', conditionsController.getConditions);
conditionsRouter.post('/:idPatient', conditionsController.createCondition);
conditionsRouter.put('/:idPatient', conditionsController.updateCondition);
conditionsRouter.delete('/:idPatient', conditionsController.deleteCondition);

module.exports = conditionsRouter;