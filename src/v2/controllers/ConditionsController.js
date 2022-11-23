const knex = require('../../database/knex');

// .../conditions
const listConditions = async (req, res) => {
  const conditions = await knex.select().from('conditions');

  return res.json(conditions);
};

// .../patients/:idPatient/conditions
const getPatientConditions = async (req, res) => {
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
};

// .../patients/:idPatient/conditions
const createPatientCondition = async (req, res) => {
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
};

// .../patients/conditions/:idRelation
const updatePatientCondition = async (req, res) => {
  const { idRelation } = req.params;
  const { isInFamily, symptoms, startedAt, stoppedAt } = req.body;
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
};

// .../patients/conditions/:idRelation
const deletePatientCondition = async (req, res) => {
  const { idRelation } = req.params;
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
};

module.exports = {
  listConditions,
  getPatientConditions,
  createPatientCondition,
  updatePatientCondition,
  deletePatientCondition,
};
