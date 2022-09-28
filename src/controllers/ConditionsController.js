const knex = require('../database/knex');

class ConditionsController {
  async listConditions(req, res) {
    const conditions = await knex.select().from('conditions');

    res.json(conditions);
  }

  async getConditions(req, res) {
    const { idPatient } = req.params;
    const patient = await knex('patients').where('id', idPatient);
    if (patient.length === 0) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientConditions = await knex('patients_conditions as pc')
      .select('c.name', 'pc.*')
      .join('conditions as c', 'pc.idCondition', 'c.id')
      .where({ idPatient });

    res.json(patientConditions);
  }

  async createCondition(req, res) {
    const { idPatient } = req.params;
    const { id: idCondition, isActive, isInFamily, symptoms } = req.body;
    const patient = await knex('patients').where('id', idPatient);
    const condition = await knex('conditions').where('id', idCondition);
    const [existingCondition] = await knex('patients_conditions').where({
      idPatient,
      idCondition,
    });
    if (existingCondition) {
      return res.status(400).json({ error: 'Condition already registered' });
    }
    if (patient.length === 0 || condition.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide existing Patient and Condition id's" });
    }
    await knex('patients_conditions').insert({
      idPatient,
      idCondition,
      isActive,
      isInFamily,
      symptoms,
    });

    res.status(201).json({
      condition,
      isActive,
      isInFamily,
      symptoms,
    });
  }

  async updateCondition(req, res) {
    const { idPatient } = req.params;
    const { id: idCondition, isActive, isInFamily, symptoms } = req.body;
    const [existingCondition] = await knex('patients_conditions').where({
      idPatient,
      idCondition,
    });
    if (!existingCondition) {
      return res.status(400).json({ error: 'Condition not registered' });
    }
    await knex('patients_conditions')
      .where({
        idPatient,
        idCondition,
      })
      .update({
        isActive,
        isInFamily,
        symptoms,
      });

    return res.json({ id: idCondition, isActive, isInFamily, symptoms });
  }

  async deleteCondition(req, res) {
    const { idPatient } = req.params;
    const { id: idCondition } = req.body;
    const [existingCondition] = await knex('patients_conditions').where({
      idPatient,
      idCondition,
    });
    if (!existingCondition) {
      return res.status(400).json({ error: 'Condition not registered' });
    }
    await knex('patients_conditions')
      .where({
        idPatient,
        idCondition,
      })
      .del();

    return res.json(existingCondition);
  }
}

module.exports = ConditionsController;
