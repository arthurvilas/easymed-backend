const knex = require('../database/knex');

class ConditionsController {
  async listConditions(req, res) {
    const conditions = await knex.select().from('conditions');

    return res.json(conditions);
  }

  async getConditions(req, res) {
    const { idPatient } = req.params;
    const [patient] = await knex('patients').where('id', idPatient);
    if (!patient) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientConditions = await knex('patients_conditions as pc')
      .select('c.name', 'pc.*')
      .join('conditions as c', 'pc.idCondition', 'c.id')
      .where({ idPatient });

    return res.json(patientConditions);
  }

  async createCondition(req, res) {
    const { idPatient } = req.params;
    const {
      idDiagnosis,
      idCondition,
      isInFamily,
      symptoms,
      startedAt,
      stoppedAt,
    } = req.body;
    const [patient] = await knex('patients').where('id', idPatient);
    const [condition] = await knex('conditions').where('id', idCondition);
    if (!patient || !condition) {
      return res
        .status(400)
        .json({ error: "Provide existing Patient and Condition id's" });
    }
    const [createdCondition] = await knex('patients_conditions').insert(
      {
        idDiagnosis,
        idPatient,
        idCondition,
        isInFamily,
        symptoms,
        startedAt,
        stoppedAt,
      },
      '*'
    );

    return res.status(201).json({ ...createdCondition, name: condition.name });
  }

  async updateCondition(req, res) {
    const { idRelation, isInFamily, symptoms, startedAt, stoppedAt } = req.body;
    const [existingCondition] = await knex('patients_conditions').where({
      id: idRelation,
    });
    if (!existingCondition) {
      return res.status(400).json({ error: 'Condition not registered' });
    }
    const [updatedCondition] = await knex('patients_conditions')
      .where({
        id: idRelation,
      })
      .update(
        {
          isInFamily,
          symptoms,
          startedAt,
          stoppedAt,
        },
        '*'
      );

    return res.json(updatedCondition);
  }

  async deleteCondition(req, res) {
    const { idRelation } = req.body;
    const [existingCondition] = await knex('patients_conditions').where({
      id: idRelation,
    });
    if (!existingCondition) {
      return res.status(400).json({ error: 'Condition not registered' });
    }
    await knex('patients_conditions')
      .where({
        id: idRelation,
      })
      .del();

    return res.json(existingCondition);
  }

  // TODO get family conditions - só filtrar mesmo
}

module.exports = ConditionsController;
