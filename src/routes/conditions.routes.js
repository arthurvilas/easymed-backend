const { Router } = require('express');
const ConditionsController = require('../controllers/ConditionsController');

const conditionsController = new ConditionsController();
const conditionsRouter = Router();

conditionsRouter.get('/list', conditionsController.listConditions);
conditionsRouter
  .route('/:idPatient')
  .get(conditionsController.getConditions)
  .post(conditionsController.createCondition)
  .patch(conditionsController.updateCondition)
  .delete(conditionsController.deleteCondition);

module.exports = conditionsRouter;
