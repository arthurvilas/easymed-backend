const knex = require('../database/knex');

class MedicationsController {
  async listMedications(req, res) {
    const medications = await knex.select().from('medications');

    return res.json(medications);
  }

  async getMedications(req, res) {
    const { idPatient } = req.params;
    const [patient] = await knex('patients').where('id', idPatient);
    if (!patient) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientMedications = await knex('patients_medications as pm')
      .select('m.name', 'pm.*')
      .join('medications as m', 'pm.idMedication', 'm.id')
      .where({ idPatient });

    return res.json(patientMedications);
  }

  async createMedication(req, res) {
    const { idPatient } = req.params;
    const {
      idMedication,
      dosage,
      type,
      frequency,
      startedAt,
      stoppedAt,
    } = req.body;
    const [patient] = await knex('patients').where('id', idPatient);
    const [medication] = await knex('medications').where('id', idMedication);
    if (!patient || !medication) {
      return res
        .status(400)
        .json({ error: "Provide existing Patient and Medication id's" });
    }
    const [createdMedication] = await knex('patients_medications').insert(
      {
        idPatient,
        idMedication,
        dosage,
        type,
        frequency,
        startedAt,
        stoppedAt,
      },
      '*'
    );

    return res
      .status(201)
      .json({ ...createdMedication, name: medication.name });
  }

  async updateMedication(req, res) {
    const {
      idRelation,
      dosage,
      type,
      frequency,
      startedAt,
      stoppedAt,
    } = req.body;

    const [existingMedication] = await knex('patients_medications').where({
      id: idRelation
    });

    if (!existingMedication) {
      return res.status(400).json({ error: 'Medication not registered' });
    }

    if (existingMedication.stoppedAt) {
      return res.status(400).json({error: "Medication already inactive"})
    }

    const [updatedMedication] = await knex('patients_medications')
      .where({
        id: idRelation
      })
      .update(
        {
          dosage,
          startedAt,
          stoppedAt,
          type,
          frequency,
        },
        '*'
      );

    return res.json(updatedMedication);
  }

  async deleteMedication(req, res) {
    const { idRelation } = req.body;
    const [existingMedication] = await knex('patients_medications').where({
      id: idRelation
    });
    if (!existingMedication) {
      return res.status(400).json({ error: 'Medication not registered' });
    }
    await knex('patients_medications')
      .where({
        id: idRelation
      })
      .del();

    return res.json(existingMedication);
  }
}

module.exports = MedicationsController;
